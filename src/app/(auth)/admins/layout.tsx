import React from 'react'
import TopNav from '@/components/TopNav'; 

interface Props { 
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='
     flex-1 flex flex-col 
    '>
      <TopNav />  
      <div className="flex-1 gap-6 grid grid-rows-4 grid-cols-4 p-4">
        {children}
      </div>
    </div>
  )
}

export default Layout;