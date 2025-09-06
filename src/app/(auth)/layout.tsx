'use client'; 
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
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
      
  useEffect(() => {
    if (status !== "authenticated" || !data?.user?.id) return;
    console.log('[SEE]: Opening connection...')
    const es = new EventSource(`/api/secure/events?userId=${data.user.id}`);
    es.onopen = () => console.log("[SSE]: Connected Successfully");
    es.onmessage = (e) => { 
      if(e.data === 'force-kick'){ 
        signOut(); 
      }
    };

    return () => {
      console.log("[SSE]: Closing connection");
      es.close();
    };
  }, [status, data?.user?.id]);


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