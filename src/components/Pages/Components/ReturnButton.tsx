'use client'; 
import React from 'react'
import Link from 'next/link';

interface ReturnButtonProps { 
  children: React.ReactNode; 
  defaultLink: string; 
  relativeWidth: boolean; 
}

const ReturnButton = ({children,  defaultLink, relativeWidth}: ReturnButtonProps) => {

  return (
    <Link href={defaultLink} className={`${relativeWidth ? 'w-fit' : 'w-25'} 
`}>
      <button  
      className={`
        bg-black text-white font-bold rounded
        px-2 py-1 
        ${relativeWidth ? 'w-fit' : 'w-25'} 
        h-fit font-semibold
      `}
    >
      {children}
    </button>
    </Link>
    
  )
}

export default ReturnButton