import React from 'react'

interface LayoutPropps { 
  children: React.ReactNode
}

const Layout = ({ children }: LayoutPropps) => {
  return (
    <div className='
      col-span-4 row-span-4 
    '>
      <div className='
        w-full  h-full   
      bg-white shadow rounded 
      '>
        {children}
      </div>
    </div>
  )
}

export default Layout; 