import React from 'react'

interface CardProps { 
  CardCol: number; 
  CardRow: number; 
  children?: React.ReactNode; 
}

const Card = ({CardCol, CardRow, children}: CardProps) => {
  const colSpan = `col-span-${CardCol}`
  const rowSpan = `row-span-${CardRow}`

  return (
    <div className={`
      bg-white shadow rounded
      ${colSpan} ${rowSpan}
    `}>
      {
        children
      }
    </div>
  )
}

export default Card 