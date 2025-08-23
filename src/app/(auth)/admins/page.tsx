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
  const [expandedAdminId, setExpandedAdminId] = useState<string | null>(null);

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
      const admins: userType[] = data.admins; 
      setIsLoading(false); 
      setError(''); 
      setAdmins(admins); 
      console.log('[ADMINS]: ', admins);
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
  const LabelClassNames = `
    ml-4
  `

  const h2ClassNames = `
    border-1 border-black rounded-2xl p-2
    font-bold
    hover:cursor-pointer
    whitespace-normal break-words 
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
      <div className='flex flex-1 gap-4 flex-col overflow-y-auto max-h-[400px]'>
        <h2>Admins</h2>
        {isLoading && <p>Loading admins..</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {admins && admins.length > 0 && ( 
          <ul>
            {
              admins.map((admin: userType)=> {
                if(!admin) return; 
                return ( 
                  <div 
                    key={admin.id}
                    className={`
                    p-2
                    rounded-md 
                    ${expandedAdminId === admin.id ? 
                      `bg-gray-300` : 'hover:bg-gray-300'
                    } 
                    `}>
                      <div
                       onClick={()=>
                        setExpandedAdminId(expandedAdminId === admin.id ? null : admin.id)
                      } 
                      className='w-full h-fit flex flex-row justify-between'>
                        <h2 className='
                          font-bold
                        '>{admin.email}</h2>
                        <h2>▼</h2>
                      </div>
                      <div>
                        { expandedAdminId === admin.id && ( 
                          <form>
                            <div>
                              <label className={LabelClassNames}>Id</label>
                              <h2 className={h2ClassNames}>{admin.id}</h2>
                            </div>
                            <div>
                              <label className={LabelClassNames}>Email</label>
                              <h2 className={h2ClassNames}>{admin.email}</h2>
                            </div>
                            <div>
                              <label className={LabelClassNames}>Name</label>
                              <h2 className={h2ClassNames}>{admin.name}</h2>
                            </div>
                            <div>
                              <label className={LabelClassNames}>Password</label>
                              <h2 className={h2ClassNames}>{admin.passwordHash}</h2>
                            </div>
                          </form>
                          )
                        }
                      </div>
                  </div>
                )
              })
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