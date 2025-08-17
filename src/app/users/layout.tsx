import React from 'react'
import TopNav from '@/components/TopNav'; 

interface Props { 
  children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='
     flex-1 flex flex-col 
    '>
      <TopNav />  
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[110px] gap-4 p-4">
        {children}
      </div>
    </div>
  )
}

export default layout