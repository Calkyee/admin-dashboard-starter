'use client'; 
import React, {useEffect, useState} from 'react'

import { z } from 'zod'; 
import { SessionSchema, UserSchema } from '@/zod';

import {
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts'

type SessionType = z.infer<typeof SessionSchema> 
type UserType = z.infer<typeof UserSchema>

const COLORS = ['#2563eb', '#d1d5db']; // blue = logged in, gray = not logged in

const CurrentAdminsLoggedInCard = () => {
  const [isLoading, setIsloading] = useState<boolean>(true); 
  const [currentSessions, setCurrentSessions] = useState<number>(); 
  const [currentAdmins, setCurrentAdmins] = useState<UserType[] | null>(null); 
  
  const [error, setError] = useState<string>(""); 
  useEffect(()=>{ 
    let interval: NodeJS.Timeout; 
    setIsloading(true); 
    
    const getAdmins = async()=>{ 
      try{
        const res = await fetch('/api/secure/admins/getAdmins', {credentials: 'include'}); 
        const data = await res.json(); 
        const admins: UserType[] = data.admins; 
        if(admins.length === 0){ 
          setError("Retrieved No Admins"); 
        }
        setCurrentAdmins(admins); 
      }catch(error){ 
        setError('Unexpected error fetching admins'); 
      }
    }
    const getSessions = async()=>{ 
      try{
        const res = await fetch('/api/secure/sessions/getSessions', {credentials: 'include'}); 
        if(!res.ok){ 
          setError("Unable to retrieve logged in admins"); 
          return; 
        }
        const data = await res.json(); 
        const sessions: SessionType[] = data.currentSessions; 
        await getAdmins() // Get the admins every 5 minutes as-well
        setCurrentSessions(sessions.length); 
        setIsloading(false);
      }catch(error){ 
        setError("Unexpected error fetching sessions"); 
      }
    }

    // Initial fetch 
    getSessions(); 
    getAdmins(); 
    interval = setInterval(getSessions, 1000 * 60 * 5); 
    return ()=> clearInterval(interval); 
  }, []); // Run when loaded

  const loggedIn = currentSessions ?? 0; 
  const total = currentAdmins?.length ?? 0; 
  const notLoggedIn = Math.max(total - loggedIn, 0); 

  const chartData = [ 
    {name: "Logged In", value: loggedIn}, 
    {name: "Not Logged In", value: notLoggedIn}
  ]; 

  return (
    <>
      <h2>Current Admins logged in</h2>  
      {error && (<h2 className='text-red-500'>{error}</h2>)}
      {isLoading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isLoading && currentSessions !== 0 && ( 
        <>
        <h2>{currentSessions}</h2>
        <div className='flex justify-center'>
          {/* Chart for rendering data here */}
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={65}
              innerRadius={35}
              label
              >
              { chartData.map((entry, idx)=>( 
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]}/>
            )) }  
            </Pie>
          <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </div>

        
        </>
      )
      }
    </>
  )
}

export default CurrentAdminsLoggedInCard