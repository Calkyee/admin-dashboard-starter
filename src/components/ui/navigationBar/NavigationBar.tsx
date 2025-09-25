'use client'; 
import React from 'react'
import { useRouter } from 'next/navigation';

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
        Buttons.map((button, idx)=>{
          console.log('[CLIENT/RENDERED BUTTON]: ', button);
          return(          
            <button
            className='text-black'
            key={idx}
            onClick={()=>handleOnClick(button.Link)}
            >
              {button.buttonTitle}
            </button>
          )
        })
      }
    </nav>
  )
}

export default NavigationBar