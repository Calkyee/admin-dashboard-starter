'use client'; 
import React from 'react'
import { useRouter } from 'next/router';

import buttonInterface from '@/lib/interfaces/buttonInterface'


interface NavigationBarProps { 
  Buttons: buttonInterface[]
}



const NavigationBar = ({Buttons}: NavigationBarProps) => {
  const router = useRouter(); 
  const handleOnClick = (Link: string)=>{ 
    router.push(Link); 
  }
  
  return (
    <nav>
      { 
        Buttons.map((button, idx)=>(
          <button
          key={idx}
          onClick={()=>handleOnClick(button.Link)}
          >
            {button.buttonTitle}
          </button>
        ))
      }
    </nav>
  )
}

export default NavigationBar