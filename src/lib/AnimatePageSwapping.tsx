import React, {useEffect, useState} from 'react'

type Props =  { 
  children: React.ReactNode
}

const AnimatePageSwapping = ({children}: Props) => {
  const [animateIn, setAnimateIn] = useState(false); 

  useEffect(()=>{
    const timeout = setTimeout(()=> setAnimateIn(true), 2); 

    return ()=> clearTimeout(timeout); 
  }, []); 

  return (
    <div
      className={`
    transition-all duration-900 ease-out h-full
    ${animateIn ? "col-span-4 row-span-4" : "col-span-1 row-span-1"}
  `}
    >
      <div
        className={`
      h-full bg-white rounded shadow-lg flex flex-col
      transform transition-transform duration-700 ease-out
      transition-opacity duration-500 delay-200
      ${animateIn ? "scale-100 opacity-100 p-4" : "scale-90 opacity-0 p-0"}
    `}
      >
        {children}
      </div>
    </div>
  )
}

export default AnimatePageSwapping