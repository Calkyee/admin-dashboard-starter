'use client'; 
import React, { useEffect, useState } from 'react'
import { UserSchema } from '@/zod';
import {z} from 'zod'; 

type UserType = z.infer<typeof UserSchema>  

const CurrentAdminsCard = () => {
  const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null); 
  const [isloading, setIsLoading] = useState<boolean | undefined>(true); 
  useEffect(()=>{ 
    setIsLoading(true); 
    const fetchUsers = async()=>{ 
      const res = await fetch('/api/secure/admins/getAdmins', {credentials: 'include'}); 
      const data = await res.json();
      const users: UserType[] | null = data.admins; 
      if(!users) return; 
      setIsLoading(false); 
      setNumberOfUsers(users.length); 
    }
    fetchUsers(); 

  }, []) // Load users on load 

  return (
    <>
      <h2>Current Admins</h2>
      {isloading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isloading && ( 
        <h2>{numberOfUsers}</h2>
      )}
    
    </>
  )
}

export default CurrentAdminsCard