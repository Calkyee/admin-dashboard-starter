'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { UserSchema } from '@/zod';
import { email, z } from 'zod';

type userType = z.infer<typeof UserSchema>;
import AdminCardForm from "@/components/Form/AdminCardForm"; 
import passwordHash from '@/lib/hashing/passwordHash';

const AdminCard = () => {
  const [admins, setAdmins] = useState<userType[] | null>(null);
  const [originalAdmins, setOriginalAdmins] = useState<userType[] | null>(null); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedAdminId, setExpandedAdminId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const res = await fetch('/api/secure/admins/getAdmins', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        setError('Unable to retrieve admins');
        return;
      }
      const admins: userType[] = data.admins;
      setIsLoading(false);
      setError('');
      setAdmins(admins);
      setOriginalAdmins(admins); 
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <AdminNavBar setOriginalAdmins={setOriginalAdmins} expandedAdminId={expandedAdminId} originalAdmins={originalAdmins} setAdmins={setAdmins} admins={admins}/>
      <div className="flex flex-1 gap-4 flex-col overflow-y-auto max-h-[400px]">
        <h2>Admins</h2>
        {isLoading && <p>Loading admins...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {admins && admins.length > 0 && (
          <ul>
            {admins.map((admin: userType) => {
              return (
                <li
                  key={admin.id}
                  className={`p-2 rounded-md border-red-500  ${
                    expandedAdminId === admin.id ? `bg-gray-300` : `hover:bg-gray-300`
                  }`}
                >
                  <div
                    onClick={() =>
                      setExpandedAdminId(expandedAdminId === admin.id ? null : admin.id)
                    }
                    className="w-full h-fit flex flex-row justify-between cursor-pointer"
                  >
                    <h2 className="font-bold">{admin.email}</h2>
                    <h2>▼</h2>
                  </div>
                  {expandedAdminId === admin.id && (
                    <AdminCardForm admin={admin}
                     onChange={(updatedAdmin) => {
                      setAdmins((prev) =>
                        prev?.map((a) => (a.id === admin.id ? updatedAdmin : a)) ?? []
                      );
                    }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};



const AdminNavBar = ({
  originalAdmins,
  setAdmins,
  expandedAdminId,
  setOriginalAdmins,
  admins
}: {
  originalAdmins: userType[] | null;
  setAdmins: React.Dispatch<React.SetStateAction<userType[] | null>>;
  setOriginalAdmins: React.Dispatch<React.SetStateAction<userType[] | null>>
  expandedAdminId: string | null;
  admins: userType[] | null; 
}) => {
  const ButtonClassNames = `
    flex justify-center
    w-4/12 max-h-12 bg-[#2B73F9] 
    text-white font-bold text-2xl p-2 rounded-sm
    hover:bg-[#1E4EA9] hover:cursor-pointer duration-100 ease-in-out
  `;

  const handleReset = () => {
    if (originalAdmins) {
      setAdmins([...originalAdmins]);
    }
  };

  const handleUpdate = ()=>{ 
    if(!expandedAdminId || !admins || !originalAdmins) return; 
    const adminToUpdate = originalAdmins.find((a)=> a.id === expandedAdminId); 
    const updatedAdmin = admins.find((a)=> a.id === expandedAdminId); 
    if(!adminToUpdate) return; 

    const validated = UserSchema.pick({ 
      email: true, 
      passwordHash: true, 
      name: true
    }).safeParse(updatedAdmin);
    if(!validated.success) return;
    const validatedUser = validated.data; 
      

    const updateReq = async()=>{ 
      console.log('[DEBUG]: sending update request')
      const res = await fetch("/api/secure/admins/updateAdmins", { 
        method: "PUT", 
        headers: { "Content-Type": "application/json"}, 
        credentials: "include",
        body: JSON.stringify({ 
          id: adminToUpdate.id, 
         ...(validatedUser.email && {email: validatedUser.email}),
         ...(validatedUser.name && {name: validatedUser.name}), 
         ...(validatedUser.passwordHash && {passwordHash: validatedUser.passwordHash}) 
        })
      }); 
      if(res.ok){ 
        // Replace old admin in adminToUpdate with the new data
        console.log('[DEBUG]: Updating admins')
        const data = await res.json(); 
        const updated: userType = data.new_user_data;
        const validated = UserSchema.safeParse(updated); 
        if(!validated.success) return; 
        setAdmins(prev => 
          prev ? prev.map(a=> a.id === validated.data.id ? validated.data : a) : prev
        ); 
        setOriginalAdmins(prev => 
          prev ? prev.map(a=> a.id === validated.data.id ? validated.data : a) : prev
        ); 
        console.log('[DEBUG]: Successfully updated admins')
      }
    }


    updateReq().catch((err: any)=>{ 
      console.error('[UPDATE ERROR]: ', err.message); 
    }) 
 
  }


  return (
    <div className="max-h-fit min-w-full flex flex-row gap-2 text-center">
      <div className={ButtonClassNames}>
        <Link href="/create/admins">Create</Link>
      </div>
      <div className={ButtonClassNames} onClick={handleReset}>
        <p>Read</p>
      </div>
      <div className={ButtonClassNames} onClick={handleUpdate}>
        <p>Update</p>
      </div>
      <div className={ButtonClassNames}>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default AdminCard;
