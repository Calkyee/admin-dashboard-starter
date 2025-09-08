'use client';
import React, {useEffect, useState} from 'react';
import { z } from 'zod';
import { FailedLogin, FailedLoginSchema} from '@/zod';
import getFailedLogins from "@/lib/UI/ServerComponents/GetFailedLogins";



const FailedLoginArraySchema = z.array(FailedLoginSchema);
type FailedLoginArrayType = z.infer<typeof FailedLoginArraySchema>;

interface Props {
  useMockData: FailedLoginArrayType | undefined;
}

const MapFailedLogins = ({ useMockData }: Props)=>{
  const [data, setData] = useState<FailedLogin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    setIsLoading(true);
    const fetchData = async()=>{
      try{
        const recievedData: FailedLoginArrayType = useMockData ? useMockData :  await getFailedLogins();
        const isValidated = FailedLoginArraySchema.safeParse(recievedData);
        if(!isValidated.success){
          console.error('[VALIDATION ERROR]: ', isValidated.error.flatten());
          return;
        }
       setData(prev => prev.length !== recievedData.length ? recievedData : prev);
      }finally{
        setIsLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, [])
  return (
    <>
      <ul className='flex flex-col gap-2'>{ !isLoading && data?.length !== 0 ? (data.map((f)=>(
        <li key={f.id} className='
          w-full h-fit min-h-4
          bg-gray-400 text-white
          p-2 rounded
          hover:cursor-pointer hover:bg-gray-600
          duration-100 ease-in-out transition-all'>
          <div className='w-full h-full flex justify-between'>
            <h2>UserId: {f.userId}</h2>

            <h2 className='text-red-400 font-bold'>Failed Login Attempts: {f.loginAttempts}</h2>
          </div>
        </li>
      )) ) : ( <h2 className='text-bold'>No Failed Logins found!</h2> )
      }</ul>
    </>
  )
}

export default MapFailedLogins;