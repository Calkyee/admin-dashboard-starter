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
            
      bg-white shadow rounded
    '>
        <div className='w-full h-fit flex flex-col '>
          <Title>TITLE</Title>
        <div className='
          w-full h-fit flex flex-row 
          pl-12 gap-2 
        '>
          <ReturnButton defaultLink={`/${CardRoot}`} relativeWidth={false}>
            Graph
          </ReturnButton>
          <ReturnButton defaultLink={`/${CardRoot}/Actions`} relativeWidth={false}>
            Actions
          </ReturnButton>
          <ReturnButton defaultLink={`/${CardRoot}/AuditLogs`} relativeWidth={false}>
            Audit Logs
          </ReturnButton>
        </div>
      </div>
      <div className='
        w-full  h-full 
      '>
        {children}
      </div>
    </div>
  )
}

export default Layout; 