'use client'; 
import { UserSchema } from '@/zod';
import React, { useState } from 'react'
import { z } from 'zod';

const AccountSchema = UserSchema.pick({ 
  email: true, name: true
}).extend({ 
  password: z.string().min(4, "Password must be at least 4 characters"),
}); 

const page = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [name, setName] = useState(''); 
  const [error, setError] = useState(''); 

  const handleAccountCreation = async(e: React.FormEvent) =>{ 
    e.preventDefault(); 
    const result = AccountSchema.safeParse({ 
      email, 
      password, 
      name
    }); 
    if(!result.success){ 
      setError(result.error?.message); 
      return; 
    }

    const res = await fetch('/api/auth/createAdmins', { 
      method: "POST", 
      body: JSON.stringify(result.data), 
      headers: { 
        'Content-Type': 'application/json'
      }
    }); 

    const data = await res.json(); 

    if(data && !res.ok){
      setError(data.error); 
    }else{ 
      window.location.href = ""; //Redirect to home page
    }
  }

  const inputClasses = error 
  ? `
    px-4 py-2 border 
    border-gray-300 border-red-500 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    
  `
  : `
    px-4 py-2 border 
    border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500
  
  `
  const labelClasses = error 
  ? `
    text-red-500
  `
  : ``
  const buttonClasses = error 
  ? `
  mt-12
  w-full h-fit bg-[#38404F]  
  text-white font-bold text-2xl p-2 rounded-lg 
  hover:cursor-not-allowed
  hover:bg-red-900 duration-100 ease-in-out    
  `
  : `
  mt-12
  w-full h-fit bg-[#38404F] 
  text-white font-bold text-2xl p-2 rounded-lg 
  hover:bg-[#334F82] hover:cursor-pointer duration-100 ease-in-out
  `
  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-6/12 h-8/12 bg-white rounded-lg shadow-lg flex justify-center items-center'>
        <form 
          onSubmit={handleAccountCreation}
          className='flex flex-1 p-6 items-center justify-center'>
          <div className='w-6/12 h-8/12 flex flex-col justfiy-around gap-4'>
            <div className='flex flex-col'>
              <label className={labelClasses}>{error ? error : "Email"}</label>
              <input type="text" 
              onChange={(e)=>setEmail(e.target.value)}
              className={inputClasses}/>
            </div>
            <div className='flex flex-col'>
              <label className={labelClasses}>{error ? error: "Password"}</label>
              <input type="password" 
              onChange={(e)=>setPassword(e.target.value)}
              className={inputClasses}/>
            </div>
            <div className='flex flex-col'>
              <label className={labelClasses}>{error ? error : "Name"}</label>
              <input type="text" 
              onChange={(e)=>setName(e.target.value)}
              className={inputClasses}/>
            </div>
            <div className='flex flex-col'>
              <button type='submit' className={buttonClasses}>
                Create Admin  
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page