'use client'; 
import React, {useState, useEffect} from 'react'
import { z } from 'zod'; 
import { SessionSchema } from '@/zod';

import { 
  LineChart, 
  Line, 
  ResponsiveContainer,
  Tooltip
} from 'recharts'

type SessionType = z.infer<typeof SessionSchema>; 

type dataPoint = { 
  loginDate: string; 
  number: number; 
}

const WeeklyUsersCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [chartData, setChartData] = useState<dataPoint[] | null>(null); 
  const [last7DaysDate, setLast7DaysDate] = useState<string | null>(null);  
  const [hovering, setHovering] = useState(false);
  useEffect(()=>{
    setIsLoading(true); 
    const getSessions = async()=>{ 
      const  res = await fetch('/api/secure/sessions/getSessions', {credentials: 'include'}); 
      const data = await res.json() ?? await res.text(); 
      if(!res.ok){
        setIsLoading(false); 
        console.error('[SESSIONS STATUS]: ', res.status); 
        console.error('[SESSIONS RESPONSE]: ', data); 
        setError(data); 
      }
      const sessions: SessionType[] | null = data.currentSessions; 
      if(!sessions){ 
        console.error('[NO SESSIONS FOUND]')
        return; 
      }; 
      console.log('[CURRENT SESSIONS]: ', sessions); 
      const now = new Date(); 
      const last7Days = Array.from({length: 7}).map((_, i)=>{ 
        const d = new Date(); 
        d.setDate(now.getDate() - (6 - i));
        return d.toISOString().split('T')[0];  
      })
      console.log('[LAST 7 DAYS]: ', last7Days); 
      setLast7DaysDate(last7Days[0]); 


      const loginForEachDate = last7Days.map(day => { 
        const number = sessions.filter(s => s.lastLoginDate === day).length; 
        return {loginDate: day, number}
      }); 
      console.log('[LOGIN FOR EACH DATE]: ', loginForEachDate); 
      setChartData(loginForEachDate); 
      setIsLoading(false); 
    }
    // Initial fetch 
    getSessions(); 

    const interval: NodeJS.Timeout = setInterval(getSessions, 1000 * 60 * 5);
    return ()=> clearInterval(interval); 
  }, [])
  if(!chartData) return; 
  const reversedData = [...chartData].reverse(); 
  return (
    <div className='
      w-full h-full
      p-4 rounded
      border border-transparent hover:border-black
    ' onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}
    >
      { isLoading && ( <div className='font-bold'>Loading...</div>)}
      {!isLoading && chartData && !error ? (
        <div className='w-full h-full pb-6 overflow-hidden'>
          <div className='w-full h-fit relative'>
            <h2 className='w-9/12 pb-2'>Weekly Administrator Logins for the past 7 days</h2>
            { hovering && (
              <button className='
                absolute
                right-0 top-0
                bg-black text-white
                px-2 py-1
                rounded
                cursor-pointer
              '
              >
                View More
              </button>
            )}
          </div>
          <ResponsiveContainer height='80%' width='100%'>
            <LineChart data={reversedData}>
              <Line
                type="stepAfter"
                dataKey="number"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Tooltip
                labelFormatter={(label) => label === 0 ? `Date: Today` : `Date: ${label}`}
                formatter={(value) => [`Logins: ${value}`, '']}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : !chartData && (
        <h2 className='font-bold text-red-500'>Error Loading Weekly Logins</h2>
      )}

    </div>
  )
}

export default WeeklyUsersCard