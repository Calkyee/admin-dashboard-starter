'use client'; 
import React, { useEffect, useState } from 'react'
import {RequestMockData} from "@/lib/mockData/RequestMockData"; 

interface SideBarGraphProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

interface dataPoint { 
  MaxRequests: number; 
  CurrentRequests: number; 
}

const SideBarGraph = ({useMockData, dataSource}: SideBarGraphProps) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [chartData, setChartData] = useState<dataPoint>({MaxRequests: 0, CurrentRequests: 0});
  


  useEffect(()=>{
    setIsLoading(true);

    if(useMockData){ 
      setChartData(RequestMockData); 
      setIsLoading(false); 
      return; 
    }

  }, [useMockData, dataSource]); 


  return (
    <div className='

      max-w-full h-4/12 p-2
    '>
      {isLoading ? ( 
       <h2>Loading...</h2> 
      ) : (
        <>
          <div className={`
            w-full h-full rounded
            bg-red-500
          `}>
            <div style={{ 
            width: `${(chartData.CurrentRequests / chartData.MaxRequests) * 100}%`
            }} className='bg-green-500 h-full rounded-bl rounded-tl'/>
          </div>
        </>
       )}
    </div>
  )
}

export default SideBarGraph