'use client'; 
import React, { useEffect, useState } from 'react'
import { FailedLogin } from '@/zod';

const FailedAdminCard = () => {
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<FailedLogin[] | null>(null); 
  const [error, setError] = useState(null);
  const [isLoading, setIsloding] = useState(true);  
  useEffect(()=>{
    setIsloding(true); 
    const getFailedAttempts = async()=>{ 
      


      setIsloding(false); 
    }
    // Initial fetch 
    getFailedAttempts(); 

    const interval: NodeJS.Timeout = setInterval(() => {
      getFailedAttempts()
      console.log('FAILED LOGIN ATTEMPTS]: ', failedLoginAttempts); 
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