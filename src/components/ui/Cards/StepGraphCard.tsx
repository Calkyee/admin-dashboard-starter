import React from 'react'
import StepGraph from '@/components/ui/Charts/StepGraph'

import AlignItem from '@/lib/AlignItemWrapper'

interface AlignItemProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const StepGraphCard = ({dataSource, useMockData}: AlignItemProps) => {
  return (
    <AlignItem>
      <StepGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default StepGraphCard