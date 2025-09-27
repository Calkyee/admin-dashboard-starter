'use client'; 
import React, {useEffect, useState} from 'react'
import { MockUserCount, UserCountInterface } from "@/lib/mockData/MockUserCount";
import ChartButton from "@/components/ui/Charts/ChartButton"; 


interface CreateReadUpdateDeleteChartProps { 
  useMockData?: boolean; 
  dataSource?: string; 
}

interface SelectedUser { 
  UserId: string; 
  Selected: boolean
}

const CreateReadUpdateDeleteChart = ({useMockData, dataSource}: CreateReadUpdateDeleteChartProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<UserCountInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null); 

  useEffect(()=>{
    setIsLoading(true); 
    if(useMockData){ 
      if(chartData.length !== 0){ 
        return; // Don't do anything 
      }
      setChartData(MockUserCount); 

      return; 
    }
  }, []); 

  return (
    <div className='
      w-full h-full p-2 flex flex-col
    '>
      <div className="h-2/12 w-full flex items-center justify-center">
        <ChartButton position={{Left: true, Middle: false, Right: false}}>
          BUTTON
        </ChartButton>
        <ChartButton position={{Left: false, Middle: true, Right: false}}>
          BUTTON
        </ChartButton>
        <ChartButton position={{Left: false, Middle: false, Right: false}}>
          BUTTON
        </ChartButton>
        <ChartButton position={{Left: false, Middle: false, Right: true}}>
          BUTTON
        </ChartButton>
      </div>
      <div className='w-full max-h-full flex flex-col gap-2 p-1 overflow-y-auto '>
        {/* USERS */}
        { chartData.map((user)=>( 
          <div  className='
            bg-[#D9D9D9]
            w-full h-fit p-2 
            flex justify-between
          '>
            <h2 className='font-bold'>{user.UserId} - {user.UserName}</h2>
            <h2>▼</h2>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default CreateReadUpdateDeleteChart