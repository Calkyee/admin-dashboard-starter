import React from 'react'

type Position = { 
  Left: boolean; 
  Right: boolean; 
  Middle: boolean; 
}

interface ChartButtonProps { 
  children: React.ReactNode;
  position: Position; 
}

const ChartButton = ({children, position}: ChartButtonProps) => {
  return (
    <div className={`
      ${position.Left ? 'rounded-l' : ''} ${position.Right ? 'rounded-r' : ''} 
      bg-[#9C5CA6]
      w-fit
      h-fit 
      px-4
      py-2 

      font-bold 
      text-2xl
    text-white 
      text-center
    `}>
      {children}
    </div>
  )
}

export default ChartButton