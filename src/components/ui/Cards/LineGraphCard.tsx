import React from 'react'
import LineGraph from "@/components/ui/Charts/LineGraph"; 

import AlignItem from '@/lib/AlignItemWrapper';

interface LineGraphCardProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const LineGraphCard = ({useMockData, dataSource}: LineGraphCardProps) => {
  return (
    <AlignItem flexType={{Col: true}} Direction={{End: true}}>
      <LineGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default LineGraphCard