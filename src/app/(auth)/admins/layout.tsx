import React from 'react'
import TopNav from '@/components/TopNav'; 

interface Props { 
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='
     w-full h-screen
    '>
      <div className="
        grid grid-cols-4 grid-rows-4 max-h-full h-full
        p-4 gap-2

      ">
        {children}
      </div>
    </div>
  )
}

export default Layout;