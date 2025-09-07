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
    <div className={`
        col-span-${animateIn ? '4' : '1'} 
        row-span-${animateIn ? '4' : '1'} 
        transition-all duration-900 
        ease-out 
        h-full`}>
      <div className={`
        h-full bg-white rounded shadow-lg flex flex-col 
        transform transition-transform duration-700 ease-out 
        ${animateIn ? "scale-100" : "scale-90"}
        transition-opacity duration-500 delay-200 
        ${animateIn ? "opacity-100" : "opacity-0"}
        p-${animateIn ? "4" : "0"}
        `}
      >
        {
          children
        }
      </div>
    </div>
  )
}

export default AnimatePageSwapping