import React from 'react'

interface CardProps { 
  CardCol: number; 
  CardRow: number; 
}

const Card = ({CardCol, CardRow}: CardProps) => {
  return (
    <div className={`
      bg-white shadow rounded
      col-span-${CardCol}
      row-span-${CardRow}
    `}>


    </div>
  )
}

export default Card