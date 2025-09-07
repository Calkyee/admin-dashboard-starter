'use client'; 
import React, { useEffect, useState } from 'react'
import { FailedLogin, Session } from '@/zod';
import onClickProps from '@/lib/interfaces/onClickProps.ts';

import {
  ResponsiveContainer, 
  PieChart, 
  Pie,
  Cell, 
  Tooltip 
} from 'recharts'; 

type dataPoint = { 
  name: string; 
  value: number; 
}

interface Props {
    setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>
    onClick?: boolean;
}

const FailedAdminCard = ({setOnClick}: Props) => {
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<FailedLogin[] | null>(null); 
  const [sessions, setSessions] = useState<Session[] | null>(null); 
  const [chartData, setChartData] = useState<dataPoint[] | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloding] = useState(true);
  const [hovering, setHovering] = useState(false);
  useEffect(()=>{
    setIsloding(true); 
    const getFailedAttempts = async()=>{ 
      const res = await fetch('/api/secure/failedLogins/getFailedLogins', {credentials: 'include'}); 
      if(!res.ok){
        setError("Unable to retrieve failed login attempts")
        return; 
       }

      const data = await res.json(); 
      const failedLoginAttempts: FailedLogin[] = data.failedLogins; 
      setFailedLoginAttempts(failedLoginAttempts.length === 0 ? null : failedLoginAttempts); 
      setIsloding(false); 
    }
    const getSessions = async()=>{
      setIsloding(true);  
      const res = await fetch('/api/secure/sessions/getSessions', {credentials: 'include'}); 
      if(!res.ok){ 
        setError("Unable to retrieve sessions"); 
        return; 
      }
      const data = await res.json(); 
      const sessions: Session[] = data.currentSessions; 

      setSessions(sessions);
      setChartData([
        {name: "Failed Login Attempts", value: failedLoginAttempts?.length ?? 0}, 
        {name: "Current Sessions", value: sessions?.length ?? 0}
      ]);
      setIsloding(false);  
       
    }
    // Initial fetch 
    getFailedAttempts(); 
    getSessions(); 

    const interval: NodeJS.Timeout = setInterval(() => {
      getFailedAttempts(); 
      getSessions(); 
    }, 1000 * 60 * 5); // Run every 5 minutes
    return ()=> clearInterval(interval);    
  }, [])

  return (
    <div className='
      w-full h-full 
      p-4 rounded 
      border border-transparent hover:border-black 
    ' onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=>setHovering(false)}
    >
      <div className='
        w-full h-fit
        relative
      '>
        <h2>Failed Login Attempts <span className='font-bold'> {failedLoginAttempts?.length ?? 0}</span></h2>
        {!isLoading && hovering && (
          <button className='
          absolute
          right-0 top-0
          bg-black text-white
          px-2 py-1
          rounded
          cursor-pointer
        ' onClick={()=>setOnClick({Card: 'FailedAdminsLogin', Active: true})}>View more</button>
        )}
      </div>
      { isLoading && (
        <div>Loading...</div>
      )}
      { error && ( 
        <div className='text-red-500'>{error}</div>
      )}
      { !isLoading && !error &&  chartData && ( 
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie 
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={65}
              innerRadius={35}
              label
            >
              {chartData.map((entry) => (
                <Cell 
                  key={entry.name} 
                  fill={entry.name === "Failed Login Attempts" ? "#f87171" : "#60a5fa"} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      )}
    </div>
  )
}

export default FailedAdminCard