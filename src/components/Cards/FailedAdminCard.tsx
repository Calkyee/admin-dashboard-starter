'use client'; 
import React, { useEffect, useState } from 'react'
import { FailedLogin, FailedLoginSchema } from '@/zod';

const FailedAdminCard = () => {
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<FailedLogin[] | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloding] = useState(true);  
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
    // Initial fetch 
    getFailedAttempts(); 

    const interval: NodeJS.Timeout = setInterval(() => {
      getFailedAttempts()
    }, 1000 * 60 * 5); // Run every 5 minutes   
  }, [])

  return (
    <>
      <h2>Failed Login Attempts</h2>
      { isLoading && ( 
        <div>Loading...</div>
      )}
      { error && ( 
        <div className='text-red-500'>{error}</div>
      )}
      { !isLoading && !error && ( 
        <h2>Failed Login Attempts: <span className='font-bold'> {failedLoginAttempts?.length ?? '0'}</span></h2>
      )}
    </>
  )
}

export default FailedAdminCard