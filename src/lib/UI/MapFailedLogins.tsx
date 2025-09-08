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
        const recievedData: FailedLoginArrayType = await getFailedLogins();
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
      <ul>{ !isLoading && data?.length !== 0 ? (data.map((f)=>(
        <li key={f.id}>User: {f.userId}</li>
      )) ) : ( <h2 className='font-bold'>No Failed Logins found!</h2> )
      }</ul>
    </>
  )
}

export default MapFailedLogins;