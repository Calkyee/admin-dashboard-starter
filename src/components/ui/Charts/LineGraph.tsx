'use client'; 
import React, {useEffect, useState} from 'react'; 
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts'; 
import MockUsers from "@/lib/mockData/MockUsers"; 

interface LineGraphProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

interface dataPoint { 
  name: string; 
  users: number; 
}

const LineGraph = ({useMockData, dataSource}: LineGraphProps)=>{ 
  const [isLoading, setIsLoading] = useState(true); 
  const [chartData, setChartData] = useState<dataPoint[]>([]); 

  useEffect(()=>{ 
    setIsLoading(true); 
    if(useMockData){ 
      setChartData(MockUsers); 
      return; 
    }
    // Implement Live data source later 
  }, []); 

  return ( 
    <div className='
      w-full h-full p-2 
    '>
      {isLoading ? ( 
        <h2>Loading...</h2>
      ) : ( 
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <Tooltip />
            <Line dataKey="users" strokeWidth={2} stroke='black'/>
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default LineGraph; 