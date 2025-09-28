import React from 'react'
import BarGraph from "@/components/ui/Charts/BarGraph"; 

import AlignItem from '@/lib/AlignItemWrapper'

interface BarGraphProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const BarGraphCard = ({useMockData, dataSource}: BarGraphProps) => {
  return (
    <AlignItem flexType={{Col: true}} Direction={{End: true}}>
      <BarGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default BarGraphCard