'use client'; 
import React from 'react'
import { signOut } from 'next-auth/react'; 

const SignOutButton = () => {
  
  return (
    <button onClick={()=> signOut({ callbackUrl: '/login'})}>
      Log out
    </button>
  )
}

export default SignOutButton