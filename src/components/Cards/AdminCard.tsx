'use client'; 
import React, { useEffect, useState } from 'react'
import Link from 'next/link'; 

import { UserSchema } from '@/zod';
import { z } from 'zod'; 
import { setegid } from 'process';

type userType = z.infer<typeof UserSchema> 

const AdminCard = () => {
  const [admins, setAdmins] = useState<userType[] | null>(null);
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [expandedAdminId, setExpandedAdminId] = useState<string | null>(null); 
 

  useEffect(()=>{ 
    const fetchAdmins = async()=>{ 
      const res = await fetch('/api/secure/admins/getAdmins', {credentials: 'include'}); 
      const data = await res.json(); 
      if(!res.ok){ 
        setIsLoading(false); 
        setError("Unable to retrive admins"); 
        return; 
      }
      const admins: userType[] = data.admins; 
      setIsLoading(false); 
      setError(''); 
      setAdmins(admins); 
    }

    fetchAdmins()
  }, [])


  return (
    <div className='flex-1 flex'>
      <AdminNavBar />
      <div className='flex flex-1 gap-4 flex-ocl overflow-y-auto max-h-[400px]'>
        <h2>Admins</h2>
        {isLoading && <p>Loading admins...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {admins && admins.length > 0 && ( 
          <ul>
            { 
              admins.map((admin: userType)=>{ 
                if(!admin) return; 
                return ( 
                  <div
                  key={admin.id}
                  className={`
                  p-2 rounded-md 
                  ${expandedAdminId === admin.id ? `bg-gray-300` : `hover:bg-gray-300`}  
                  `}
                  >
                    <div onClick={()=>{ 
                      setExpandedAdminId(expandedAdminId === admin.id ? null : admin.id); 
                    }}
                    className='w-full h-ft flex flex-row justify-between'
                    > 
                      <h2 className='font-bold'>
                        {admin.email}
                      </h2>
                      <h2>
                        ▼
                      </h2>
                    </div>
                    { expandedAdminId === admin.id && ( 
                      <AdminForm admin={admin}/>
                    )
                    }
                  </div>
                )
              })
            }

          </ul>
        )}

      </div>


    </div>
  )
}

const AdminForm = ({admin}: {admin: userType})=>{ 
  const [editingField, setEditingField] = useState<{ 
    adminId: string; 
    field: "name" | "email" | "password"; 
  } | null>(null);

  const LabelClassNames = 
      `
        ml-4
      `
  const h2ClassNames = 
    `
      border border-black rounded-2xl p-2
      font-bold
      whitespace-normal break-words
    `
  const divClassNames =  
  `
    flex flex-col w-full
  `

  return ( 
    <form>
      <div>
        <label className={LabelClassNames}>Id</label>
        <h2 className={h2ClassNames}>{admin.id}</h2>
      </div>
      {/* Email Field */}
      <div>
        { editingField?.adminId === admin.id && editingField.field === 'email' ? ( 
          <div className={divClassNames}>
            <label className={LabelClassNames}>Email</label>
            <input type="text" className={h2ClassNames} defaultValue={admin.email} onBlur={()=>setEditingField(null)}/>
          </div>  
        )
        : ( 
          <div className={divClassNames}>
            <label className={LabelClassNames}>Email</label>
            <h2
              className={h2ClassNames}
              onClick={()=>
                setEditingField({ 
                  adminId: admin.id, 
                  field: 'email'
                })
              }
            >
              {admin.email}
            </h2>
          </div>
        )

        }
      </div>
      {/* Name Field */}
      <div>
        {editingField?.adminId == admin.id && editingField.field == 'name' ? ( 
          <div className={divClassNames}>
            <label className={LabelClassNames}>Name</label>
            <input type="text" 
              className={h2ClassNames}
              defaultValue={admin.name}
              onBlur={()=>{ 
                setEditingField(null); 
              }}
            />
          </div>
        )
        : ( 
          <div className={divClassNames}>
            <label className={LabelClassNames}>Name</label>
            <h2
            onClick={()=>
              setEditingField({ 
                adminId: admin.id, 
                field: 'name'
              })
            }
            className={h2ClassNames}
            >
              {admin.name}
            </h2>
          </div>
        )
        }
      </div>
      {/* Password Field */}
      <div>
        { editingField?.adminId === admin.id && editingField.field === 'password' ? ( 
          <div className={divClassNames}>
            <label className={LabelClassNames}>Password</label>
            <input type="text" 
              className={h2ClassNames}
              defaultValue={admin.passwordHash ?? ""}
              onBlur={()=>setEditingField(null)}
            />
          </div>
        )
        : ( 
          <div className={divClassNames}> 
            <label className={LabelClassNames}>Password</label>
            <h2
              onClick={()=>{
                setEditingField({ 
                  adminId: admin.id, 
                  field: 'password'
                }); 
              }}
              className={h2ClassNames}
            >
              {admin.passwordHash ?? ""}
            </h2>

          </div>
        )

        }
      </div>
    </form>
  )
}


const AdminNavBar = ()=>{ 
  const ButtonClassNames = 
    `
      flex justify-center
      w-4/12 h-fit bg-[#2B73F9] 
      text-white font-bold text-2xl p-2 rounded-sm
      hover:bg-[#1E4EA9] hover:cursor-pointer duration-100 ease-in-out
    `

  return ( 
    <div className='max-h-fit min-w-full flex flex-row gap-2 text-center'>
      <div className={ButtonClassNames}>
        <Link href='/create/admin'>Create Admin</Link>
      </div>
      <div className={ButtonClassNames}>
        <p>Reset Admin</p>
      </div>
      <div className={ButtonClassNames}>
        <p>Update Admins</p>
      </div>
      <div className={ButtonClassNames}>
        <p>Delete Admin</p>
      </div>
    </div>
  )
}

export default AdminCard