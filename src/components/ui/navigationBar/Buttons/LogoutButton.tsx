'use client'; 
import React from 'react'
import { useRouter } from 'next/navigation'; 

const LogoutButton = () => {
  const router = useRouter(); 

  const handleLogout = ()=>{ 
    router.push('/'); 
  }
  
  return (
    <button className='
      w-10/12
      h-fit 
      min-h-12
      py-2 px-2
      mb-5

      rounded
      text-center
    text-white
      text-[1.5rem]
      font-bold

      bg-[#A65C5D]
    ' onClick={()=>handleLogout()}>
      Logout
    </button>
  )
}

export default LogoutButton