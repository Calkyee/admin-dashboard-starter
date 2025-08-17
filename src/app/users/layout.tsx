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
      <div>
        {children}
      </div>
    </div>
  )
}

export default layout