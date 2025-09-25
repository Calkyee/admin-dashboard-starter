import React from 'react'


interface props { 
  children: React.ReactNode
}

const layout = ({children}: props) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout