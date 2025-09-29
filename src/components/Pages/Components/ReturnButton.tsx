'use client'; 
import React from 'react'
import { useRouter } from "next/navigation"; 

interface ReturnButtonProps { 
  children: React.ReactNode; 
  defaultLink: string; 
  relativeWidth: boolean; 
}

const ReturnButton = ({children,  defaultLink, relativeWidth}: ReturnButtonProps) => {
  const router = useRouter(); 

  const handleOnClick = ()=>{ 
    router.push(defaultLink)
  }

  return (
    <button 
      onClick={()=>handleOnClick()} 
      className={`
        bg-black text-white font-bold rounded
        px-2 py-1 
        ${relativeWidth ? 'w-1/12' : 'w-24'} 
        h-fit font-semibold
      `}
    >
      {children}
    </button>
  )
}

export default ReturnButton