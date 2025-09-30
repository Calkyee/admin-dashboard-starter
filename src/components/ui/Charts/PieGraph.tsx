'use client'; 
import React, {useEffect, useState} from 'react'
import {ResponsiveContainer, PieChart, Pie, Tooltip} from 'recharts'; 

import MockUsers from "@/lib/mockData/MockUsers"; 

interface PieGraphProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

interface dataPoint { 
  name: string; 
  users: number; 
}

const PieGraph = ({ useMockData, dataSource }: PieGraphProps) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [chartData, setChartData] = useState<dataPoint[]>([]);

  useEffect(()=>{
    setIsLoading(true); 
    if(useMockData){ 
      setChartData(MockUsers); 
      setIsLoading(false); 
      return; 
    }

  }, [useMockData, dataSource])

  return (
    <div className='
      w-full h-full p-2
    '>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ResponsiveContainer>
          <PieChart data={chartData}>
            <Tooltip />
            <Pie dataKey="users" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} fill='#82ca9d'/>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default PieGraph