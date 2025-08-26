'use client'; 
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';


interface Props { 
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  const router = useRouter();
  const params = usePathname();  
  const {data, status} = useSession();   
  
  useEffect(()=>{ 
    console.log('[USER  DATA]: ', data);
    if(status === 'loading') return;  
    if(status === 'unauthenticated'){ 
      return router.push('/login'); 
    }
  }, [data, status, router]); 
  
  if(status === 'loading'){ 
    return (
      <div>
        loading...
      </div>
    )
  }else if(status === 'unauthenticated' && params === '/login'){ 
    return ( 
      <>
        {children}
      </>
    )
  }else if(status === 'authenticated'){ 
    return ( 
      <>
        {children}
      </>
    )
  }
}

export default Layout;