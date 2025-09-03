'use client'; 
import React from 'react'
import { signOut } from 'next-auth/react'; 

interface Props { 
  children: React.ReactNode; 
}

const SignOutButton: React.FC<Props> = ({children}) => {
  return (
    <button onClick={()=> signOut({ callbackUrl: '/login'})}
    className={`
      text-white font-medium text-[24px] p-2 rounded-md 
      hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-white/20
      w-10/12 text-center
      cursor-pointer
      duration-100 ease-in-out transition-all
      `}
    >
      {children}
    </button>
  )
}

export default SignOutButton