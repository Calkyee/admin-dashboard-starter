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
    return clearInterval(interval); 
  }, [])
  if(!chartData) return; 
  const reversedData = [...chartData].reverse(); 
  return (
    <>
      <h2>Weekly Admin Logins for the past 7 days</h2>
      {error && (<h2 className='text-red-500'>{error}</h2>)}
      {isLoading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isLoading && !error && chartData ? (
        <ResponsiveContainer width="100%" height={150}>
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
      ) : !isLoading && ( 
        <h2 className='text-red-500'>No active sessions</h2>
      )}
    
    </>
  )
}

export default WeeklyUsersCard