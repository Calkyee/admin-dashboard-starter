'use client'; 
import React, {useEffect, useState} from 'react'

import onClickProps from '@/lib/interfaces/onClickProps'; 


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

interface Props { 
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>
  onClick?: boolean;  
}

const COLORS = ['#2563eb', '#d1d5db']; // blue = logged in, gray = not logged in

const CurrentAdminsLoggedInCard = ({setOnClick, onClick}: Props) => {
  const [isLoading, setIsloading] = useState<boolean>(true); 
  const [currentSessions, setCurrentSessions] = useState<number>(); 
  const [currentAdmins, setCurrentAdmins] = useState<UserType[] | null>(null); 
  const [hover, setHover] = useState(false); 
  
  const [error, setError] = useState<string>(""); 
  useEffect(()=>{  
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
        if(error){ 
          setError('Unexpected error fetching admins'); 
        }
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
        if(error){ 
          setError("Unexpected error fetching sessions"); 
        }
      }
    }

    // Initial fetch 
    getSessions(); 
    getAdmins(); 
    const interval: NodeJS.Timeout = setInterval(getSessions, 1000 * 60 * 5); 
    return ()=> clearInterval(interval); 
  }, []); // Run when loaded

  const loggedIn = currentSessions ?? 0; 
  const total = currentAdmins?.length ?? 0; 
  const notLoggedIn = Math.max(total - loggedIn, 0); 

  const chartData = [ 
    {name: "Logged In", value: loggedIn}, 
    {name: "Not Logged In", value: notLoggedIn}
  ]; 

  const handleOnClick = ()=>{ 
    setOnClick({ 
      Card: 'CurrentsLoggedIn', 
      Active: true, 
    }); 
  }

  return (
    <div className='
    w-full h-full
    p-4 rounded 
    hover:border-1 hover:border-black 
    ' 
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    > 
      <div className='w-full h-fit flex justify-between'>
      <h2>Current Admins logged in <span className='font-bold'> {currentSessions}</span></h2>
      {hover && ( 
        <button className='bg-black text-white px-2 py-1 rounded cursor-pointer'
        onClick={()=>setOnClick({Card: 'CurrentsLoggedIn', Active: true})}
        >View More</button>
      )}  
      </div>
      {error && (<h2 className='text-red-500'>{error}</h2>)}
      {isLoading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isLoading && currentSessions !== 0 && ( 
        <>
          {/* Chart for rendering data here */}
          <ResponsiveContainer width="100%" height="100%">
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
        </>
      )
      }
    </div>
  )
}

export default CurrentAdminsLoggedInCard