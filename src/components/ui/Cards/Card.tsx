import React from 'react'

interface CardProps { 
  CardCol: number; 
  CardRow: number; 
  children?: React.ReactNode; 
}

const Card = ({CardCol, CardRow, children}: CardProps) => {
  return (
    <div className={`
      bg-white shadow rounded
      col-span-${CardCol}
      row-span-${CardRow}
    `}>
      {
        children
      }
    </div>
  )
}

export default Card