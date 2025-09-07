'use client';
import React, {useEffect, useState} from 'react';
import { FailedLogin, FailedLoginSchema} from '@/zod';
import getFailedLogins from "@/lib/UI/ServerComponents/GetFailedLogins";


const MapFailedLogins = ()=>{
  const [data, setData] = useState<FailedLogin[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    setIsLoading(true);
    (async ()=>{
      try{
        const recievedData: FailedLogin[] = await getFailedLogins();
        for(const f of recievedData){
          const isValidated = FailedLoginSchema.safeParse(f);
          if(!isValidated.success){
            console.error('[VALIDATION ERROR]: ', isValidated.error.flatten());
            return;
          }
        }
        setData(recievedData);
      }finally{
        setIsLoading(false);
      }}
    )();
  }, [])
  return (
    <>


    </>
  )
}

export default MapFailedLogins;