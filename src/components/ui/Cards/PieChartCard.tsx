import React from 'react'
import PieGraph from "@/components/ui/Charts/PieGraph"; 

import AlignItem from '@/lib/AlignItemWrapper'

interface PieChartProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const PieChartCard = ({useMockData, dataSource}: PieChartProps ) => {
  return (
    <AlignItem>
      <PieGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default PieChartCard