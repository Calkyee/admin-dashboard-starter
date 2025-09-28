import React from 'react'
import HeatMapChart from "@/components/ui/Charts/HeatMapChart"; 

import AlignItem from '@/lib/AlignItemWrapper';

interface HeatMapCardProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const HeatMapCard = ({useMockData, dataSource}: HeatMapCardProps) => {
  return (
    <AlignItem flexType={{Row: true}} Direction={{Start: true}}>
      <HeatMapChart useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default HeatMapCard