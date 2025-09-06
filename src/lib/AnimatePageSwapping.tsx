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
    <div className={`col-span-${animateIn ? '4' : '1'} row-span-${animateIn ? '4' : '1'} transition-all duration-900 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] h-full`}>
      <div className={`h-full p-${animateIn ? '4' : '0'} rounded shadow-lg bg-white flex flex-col transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] opacity-${animateIn ? '100' : '0'}`}>
        {
          children
        }
      </div>
    </div>
  )
}

export default AnimatePageSwapping