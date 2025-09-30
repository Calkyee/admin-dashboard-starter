'use client'; 
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'; 

import Title from '@/components/Pages/Components/Title'
import ReturnButton from '@/components/Pages/Components/ReturnButton'

interface LayoutPropps { 
  children: React.ReactNode
}

const Layout = ({ children }: LayoutPropps) => {
  const { CardId } = useParams(); 
  const CardRoot = Array.isArray(CardId)
  ? CardId[0]
  : (CardId as string).split("/")[0]
  
  return (
    <div className='
      col-span-4 row-span-4
      bg-white rounded shadow 
    '>
      <div className='
        w-full 
        min-h-fit h-2/12

        flex flex-col 
      '>
        <Title>Title</Title>
        <div className='
          w-full h-fit 
          flex flex-row gap-4
          pl-5 
        '>
          <ReturnButton relativeWidth={false} defaultLink='/'>
            Graph
          </ReturnButton>
          <ReturnButton relativeWidth={false} defaultLink='/Actions'>
            Actions
          </ReturnButton>
          <ReturnButton relativeWidth={false} defaultLink='/AdutiLogs'>
            Audit Logs
          </ReturnButton>
        </div>

      </div>
      <div className='
        w-full h-10/12 
      '>
        { 
          children
        }
      </div>
    </div>
  )
}

export default Layout; 