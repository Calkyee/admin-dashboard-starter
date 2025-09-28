'use client'; 
import React from 'react'
import { SessionCountFor8Days } from '@/lib/mockData/MockSessionsCount'; 

interface CellProps { 
  active?: boolean; 
}

interface HeatMapProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}


const Cell = ({active}: CellProps)=>{ 
  return ( 
    <div className={`w-full h-full ${active ? 'bg-green-500': 'bg-red-500'}`}/>
  )
}

const useHeatMapConfig = ({dataSource, useMockData}: HeatMapProps)=>{ 
  let HeatMapConfig; 
  if(useMockData){ 
    HeatMapConfig = SessionCountFor8Days.map((session, idx) => ({
      id: idx,
      Cell: <Cell active={session.active_sessions === 0 ? false : true} />
    }));
    return HeatMapConfig;
  }
  // Fetch and Return Live data

}



const HeatMap = ()=>{ 
  const HeatMapConfig = useHeatMapConfig({useMockData: true}); 
  if(!HeatMapConfig) return; 

  return ( 
    <>
      { HeatMapConfig.map((Cell, idx)=>( 
        <div key={idx} className={`w-full h-full col-span-1 row-span-1`}>
          {Cell.Cell}
        </div>
      ))
      }
    </>
  )
}

const HeatMapChart = ({useMockData, dataSource}: HeatMapProps) => {
  return (
    <div className='
      p-4
      w-4/12 h-12/12
      grid grid-cols-8 grid-rows-8 gap-1  
    '>
      <HeatMap />
    </div>
  )
}



export default HeatMapChart