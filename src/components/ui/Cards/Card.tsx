import React from 'react'
import CardHeading from "@/components/ui/Cards/CardHeading"; 


interface CardProps { 
  CardCol: number; 
  CardRow: number; 
  children?: React.ReactNode; 
  Title: string; 
  DetailPageUrl?: string; 
}

const Card = ({CardCol, CardRow, children, Title, DetailPageUrl}: CardProps) => {
  const colSpan: Record<number, string> = { 
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3', 
    4: 'col-span-4'
  }
  const rowSpan: Record<number, string> = { 
    1: 'row-span-1',
    2: 'row-span-2', 
    3: 'row-span-3', 
    4: 'row-span-4'
  }

  return (
    <div className={`
      bg-white shadow rounded
      flex flex-col 
      ${colSpan[CardCol]} ${rowSpan[CardRow]}
    `}>
      {
        DetailPageUrl && ( 
        <CardHeading DetailPageUrl={DetailPageUrl}>
          {Title}
        </CardHeading>
        )        
      }
      <div className={`
        w-full h-full 
          
      `}>
        {
          children
        }
      </div>
    </div>
  )
}

export default Card 