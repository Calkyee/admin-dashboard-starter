'use client'; 
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';


interface Props { 
  children: React.ReactNode;
}

const layout = ({children}: Props) => {
  const router = useRouter();
  const params = usePathname();  
  const {data, status} = useSession();   
  
  useEffect(()=>{ 
    console.log('[USER  DATA]: ', data); 
    if(status === 'unauthenticated'){ 
      router.push('/login'); 
    }
    if(params === '/login' && status === 'authenticated'){ 
      router.push('/'); 
    }
  }, [status, router]); 
  
  return (
    <>{children}</>
  )
}

export default layout