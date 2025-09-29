import React from 'react'

interface CardProps { 
  CardCol: number; 
  CardRow: number; 
  children?: React.ReactNode; 
}

const Card = ({CardCol, CardRow, children}: CardProps) => {
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
      ${colSpan[CardCol]} ${rowSpan[CardRow]}
    `}>
      {
        children
      }
    </div>
  )
}

export default Card 