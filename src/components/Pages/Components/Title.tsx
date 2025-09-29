import React from 'react'
import ReturnButton from "@/components/Pages/Components/ReturnButton"; 

interface TitleProps { 
  children: React.ReactNode; 
}

const Title = ({children}: TitleProps) => {
  return (
    <div className='
      w-12/12 h-fit 
      flex flex-row 
      justify-between
      items-center
      p-4
    '>
      
      <h2 className='font-bold text-[1.25rem]'>{children}</h2>
      <ReturnButton defaultLink='/' relativeWidth={true}>
        RETURN 
      </ReturnButton>
      
    </div>
  )
}

export default Title