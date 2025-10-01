'use client'; 
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'; 

import Title from '@/components/Pages/Components/Title'
import ReturnButton from '@/components/Pages/Components/ReturnButton'

interface LayoutPropps { 
  children: React.ReactNode
}

interface NavItemInterface { 
  label: "Graph" | "Actions" | "Audit Logs"; 
  path: "" | "Actions" | "AuditLogs"
}

const navItems: NavItemInterface[] = [ 
  {label: 'Graph', path: ''}, 
  {label: 'Actions', path: 'Actions'}, 
  {label: 'Audit Logs', path: 'AuditLogs'}, 
]; 

const Layout = ({ children }: LayoutPropps) => {
  const { CardId } = useParams(); 
  const CardRoot = Array.isArray(CardId)
  ? CardId[0]
  : (CardId as string).split("/")[0]; 

  const splitCamelCase = (text: string)=>{ 
    return text
      .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Z])/g, '$1 $2'); 
  }
  
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
        <Title>{splitCamelCase(CardRoot)}</Title>
        <div className='
          w-full h-fit 
          flex flex-row gap-4
          pl-5 
        '>
          { 
            navItems.map(({label, path})=>( 
              <ReturnButton 
                key={label}
                relativeWidth={false}
                defaultLink={`/${CardRoot}/${path}`}
              >
                {label}
              </ReturnButton>
            ))
          }
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