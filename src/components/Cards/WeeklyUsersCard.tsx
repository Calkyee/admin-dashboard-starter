'use client'; 
import React, {useState, useEffect} from 'react'
import { z } from 'zod'; 
import { SessionSchema } from '@/zod';

type SessionType = z.infer<typeof SessionSchema>; 

type dataPoint = { 
  loginDate: string; 
  number: number; 
}

const WeeklyUsersCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [chartData, setChartData] = useState<dataPoint[] | null>(null); 
  useEffect(()=>{
    let interval: NodeJS.Timeout; 
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
      console.log('[LAST 7 DAYS]: ', last7Days)

    }
    // Initial fetch 
    getSessions(); 

    // Runs every 5 minutes 
    interval = setInterval(() => {
      getSessions(); 
    }, 1000 * 60 * 5);
    return clearInterval(interval); 
  }, [])

  return (
    <div>


    </div>
  )
}

export default WeeklyUsersCard