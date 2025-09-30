import React from 'react'

interface props { 
  children: React.ReactNode
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='
      h-full w-full
      grid grid-cols-4 grid-rows-4
      gap-5

    '>
      {children}
    </div>
  )
}


