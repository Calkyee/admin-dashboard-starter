'use client'; 
import React, { useEffect, useState } from 'react'
import {
  LineChart, 
  Line, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts'; 

import { UserSchema } from '@/zod';
import {z} from 'zod'; 

type UserType = z.infer<typeof UserSchema>  
type DataPoint = { 
  data: string; 
  users: number; 
}

const CurrentAdminsCard = () => {
  const [data, setData] = useState<DataPoint[]>([]); 
  const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null); 
  const [isloading, setIsLoading] = useState<boolean | undefined>(true); 
  useEffect(()=>{ 
    setIsLoading(true); 
    const fetchUsers = async()=>{ 
      const res = await fetch('/api/secure/admins/getAdmins', {credentials: 'include'}); 
      const data = await res.json();
      const users: UserType[] | null = data.admins; 
      if(!users) return; 
      const growthData: DataPoint[] = users.map((_, idx) => ({
        data: String(idx + 1), 
        users: idx + 1
      }));
      setData(growthData); 
      setIsLoading(false); 
      setNumberOfUsers(users.length); 
    }
    fetchUsers(); 

  }, []) // Load users on load 

  return (
    <>
      <h2>Current Admins <span className='font-bold'> {numberOfUsers}</span></h2>
      {isloading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isloading && ( 
        <>
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="stepAfter"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Tooltip
                  formatter={(value) => [`${value} admins`, ""]}
                  labelFormatter={(label) => `Index ${label}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </>
      )}
    
    </>
  )
}

export default CurrentAdminsCard