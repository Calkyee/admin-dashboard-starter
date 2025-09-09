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
    p-4 rounded
    border border-transparent hover:border-black'
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}>
      {isloading && (<div className='font-bold'>Loading...</div>)}
      {!isloading && numberOfUsers && (
        <div className='w-full h-full pb-4 overflow-hidden '>
          <div className='w-full h-fit relative pb-4'>
            <h2 className='w-8/12'>Current Existing Administrators: <span className='font-bold'>{numberOfUsers}</span></h2>
            { hovering && !isloading && (
              <button className='
                absolute
                right-0 top-0
                bg-black text-white
                px-2 py-1
                rounded
                cursor-pointer
              '
              onClick={()=> setOnClick({Card: 'CurrentAdmins', Active: true})}
              >
                view more
              </button>
            )}
          </div>
          { numberOfUsers && (
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={data}>
                <Line
                  dataKey={'users'}
                  type="stepAfter"
                />
                <Tooltip/>
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  )
}

export default CurrentAdminsCard