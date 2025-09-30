'use client'; 
import React, {useState} from 'react'
import ReturnButton from '@/components/Pages/Components/ReturnButton';

interface CardHeadingProps { 
  children: React.ReactNode; 
  DetailPageUrl: string; 
}


const CardHeading = ({children, DetailPageUrl}: CardHeadingProps) => {

  return (
    <div className='
      w-full h-4/12
      p-2
      flex items-center justify-between
      
    '>
      <div className='text-black font-bold'>
        {children}
      </div>
      <div className=''>
        <ReturnButton defaultLink={DetailPageUrl} relativeWidth={true}>
          VIEW MORE
        </ReturnButton>
      </div>
    </div>
  )
}




export default CardHeading