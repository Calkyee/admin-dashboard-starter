'use client'; 
import React, { useEffect, useState } from 'react'
import { BarChart, Tooltip, ResponsiveContainer, Bar } from 'recharts'; 
import MockUsers from "@/lib/mockData/MockUsers"; 

interface BarGraphProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

interface dataPoint { 
  name: string; 
  users: number; 
}



const BarGraph = ({useMockData, dataSource}: BarGraphProps) => {
  const [chartData, setChartData] = useState<dataPoint[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(()=>{
    setIsLoading(true); 
    if(useMockData){ 
      setChartData(MockUsers);
      setIsLoading(false); 
      return; 
    }
    // Implement live data source later 
  }, [useMockData, dataSource]); 

  return (
    <div className='w-full h-full p-2'>
      { isLoading ? ( 
        <h2>Loading...</h2>
      ) : (
        <ResponsiveContainer width="100%" height="100%">  
          <BarChart data={chartData}>
            <Tooltip itemStyle={{color: "black"}} labelStyle={{color: 'black'}}/>
            <Bar dataKey="users" fill='transparent' strokeWidth={2} stroke='black'/>
          </BarChart>
        </ResponsiveContainer>
       )}
    </div>
  )
}

export default BarGraph