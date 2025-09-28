import React from 'react'

type flexType = { 
  Col?: boolean; 
  Row?: boolean; 
}

type DirectionType = { 
  End?: boolean; 
  Start?: boolean; 
  Left?: boolean; 
  Right?: boolean; 
}

interface AlignItemProps { 
  children: React.ReactNode;
  flexType?: flexType;  
  Direction?: DirectionType; 
}

// AlignItem Wrapper 
const AlignItem = ({children, flexType, Direction}: AlignItemProps)=>{ 
  const flexTypeCss = flexType?.Col ? 'flex-col' : flexType?.Row ? 'flex-row' : 'flex-row'; // Flex row by default 
  const directionType = Direction?.Start ? 'justify-start' : Direction?.End? 'justify-end' : Direction?.Left ? 'justify-left' : Direction?.Right ? 'justify-right' : 'justify-right'

  return ( 
    <div className={`
      w-full h-full flex
      ${flexTypeCss} ${directionType}
    `}>
      {children}
    </div>
  )
}

export default AlignItem; 