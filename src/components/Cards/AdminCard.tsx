'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { UserSchema } from '@/zod';
import { z } from 'zod';

type userType = z.infer<typeof UserSchema>;
import AdminCardForm from "@/components/Form/AdminCardForm"; 

const AdminCard = () => {
  const [admins, setAdmins] = useState<userType[] | null>(null);
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
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <AdminNavBar />
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
                    <AdminCardForm admin={admin} />
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



const AdminNavBar = () => {
  const ButtonClassNames = `
    flex justify-center
    w-4/12 max-h-12 bg-[#2B73F9] 
    text-white font-bold text-2xl p-2 rounded-sm
    hover:bg-[#1E4EA9] hover:cursor-pointer duration-100 ease-in-out
  `;

  return (
    <div className="max-h-fit min-w-full flex flex-row gap-2 text-center">
      <div className={ButtonClassNames}>
        <Link href="/create/admin">Create</Link>
      </div>
      <div className={ButtonClassNames}>
        <p>Read</p>
      </div>
      <div className={ButtonClassNames}>
        <p>Update</p>
      </div>
      <div className={ButtonClassNames}>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default AdminCard;
