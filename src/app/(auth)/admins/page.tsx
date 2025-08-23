'use client'; 
import React, { useEffect, useState, useTransition } from 'react'
import Link from 'next/link' 

import { UserSchema } from '@/zod';
import { z } from 'zod';
type userType = z.infer<typeof UserSchema>

const page = () => {
  const [admins, setAdmins] = useState<userType[] | null>(null); 
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(()=>{ 
    // Load on page loading 
    const fetchAdmins = async()=>{ 
      const res = await fetch('/api/auth/getAdmins'); 
      if(!res.ok){ 
        setIsLoading(false) 
        setError('Unable to retrieve admins'); 
        return; 
      }
      const data = await res.json(); 

      setIsLoading(false); 
      setError(''); 
      setAdmins(data.admins); 
      console.log('[ADMINS]: ', data.admins);
    }
    fetchAdmins(); 
  }, [])  

  const ButtonClassNames = 
  `
    flex justify-center
    w-4/12 h-fit bg-[#2B73F9] 
    text-white font-bold text-2xl p-2 rounded-sm
    hover:bg-[#1E4EA9] hover:cursor-pointer duration-100 ease-in-out
  `

  return (
    <>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 1</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 2</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 3</div>
    <div className="
    col-span-1 row-span-2
  bg-white 
    shadow-lg p-4 rounded 
    flex flex-col 
    ">
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 5</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-4 flex flex-col gap-5">
      <div className='max-h-fit min-w-full flex flex-row gap-2 text-center'>
        <div className={ButtonClassNames}>
        <Link href='/create/admins'>Create Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Read Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Update Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <Link href='/create/admins'>Delete Admin</Link>
      </div>
      </div>
      <div className='flex flex-1 gap-4 flex-col'>
        <h2>Admins</h2>
        {isLoading && <p>Loading admins..</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {admins && admins.length > 0 && ( 
          <ul>
            {
              admins.map((admin)=> (
                <div 
                key={admin.id}
                className='
                 flex flex-row align-middle justify-between
                 p-2
                 rounded-md 
                 hover:bg-gray-300 
                '>
                  <h2 className='
                  font-bold
                '>{admin.email}</h2>
                  <h2>▼</h2>
                </div>
              ))
            }
          </ul>
        )}
      </div>
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 6</div>
  </>
  )
}

export default page