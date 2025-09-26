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
    <nav className=' 
      flex-1 
      w-full 

      flex flex-col 
      justify-start items-center gap-[1.25rem]
    '>
      { 
        Buttons.map((button, idx)=>{
          return(          
            <button
            className='
            w-10/12
            h-fit 
            min-h-12
            py-2 px-2

            rounded
            text-center
          text-white
            text-[1.5rem]
            font-bold

            bg-[#9C5CA6]

            '
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