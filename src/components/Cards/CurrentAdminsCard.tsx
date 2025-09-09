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
import onClickProps from '@/lib/interfaces/onClickProps';

type UserType = z.infer<typeof UserSchema>  
type DataPoint = { 
  data: string; 
  users: number; 
}

interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>;
}

const CurrentAdminsCard = ({setOnClick}: Props) => {
  const [data, setData] = useState<DataPoint[]>([]); 
  const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null); 
  const [isloading, setIsLoading] = useState<boolean | undefined>(true); 
  const [hovering, setHovering] = useState(false);
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
    <div className='
      w-full h-full 
      rounded p-2
      flex flex-col justify-center align-middle
      border border-transparent hover:border-black
    ' onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=>setHovering(false)}
      >
      <div className='w-full min-h-4 relative'>
        <h2>Current Admins <span className='font-bold'> {numberOfUsers}</span></h2>
        { hovering && (
          <button
            className='
            absolute right-0 top-0
           bg-black text-white py-2 px-1 rounded cursor-pointer
          '
            onClick={()=>setOnClick({
              Card: 'CurrentAdmins',
              Active: true
          })}>View more</button>
        )}
      </div>

      {isloading && (<h2 className='text-red-500'>Loading...</h2>)}
      {!isloading && ( 
        <>
          <div className="h-10/12 w-12/12 mt-4 flex align-middle justify-center">
            <ResponsiveContainer height='100%' width='100%'>
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
    </div>
  )
}

export default CurrentAdminsCard