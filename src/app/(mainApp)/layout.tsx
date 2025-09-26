import React from 'react'

interface props { 
  children: React.ReactNode
}

const MainAppLayout = ({children}: props) => {
  return (
    <>
      {children}
    </>
  )
}

export default MainAppLayout; 