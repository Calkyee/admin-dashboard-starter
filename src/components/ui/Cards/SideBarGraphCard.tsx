'use client'; 
import React from 'react'
import SideBarGraph from "@/components/ui/Charts/SideBarGraph";
import AlignItem from '@/lib/AlignItemWrapper';

interface BarGraphCardProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

const BarGraphCard = ({useMockData, dataSource}: BarGraphCardProps) => {
  return (
    <AlignItem flexType={{Col: true}} Direction={{End: true}}>
      <SideBarGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
      <SideBarGraph useMockData={useMockData} dataSource={dataSource ? dataSource : undefined}/>
    </AlignItem>
  )
}

export default BarGraphCard; 