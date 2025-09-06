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
    if(status === 'authenticated'){ 
      console.log('[SSE]: Opening connection for user', data.user?.id); 
      const es = new EventSource(`/api/secure/events?userId=${data.user?.id}`); 
      es.onopen = ()=>{ 
        console.log('[SSE]: Connected Successfully')
      } 
      es.onmessage = (e)=>{ 
        console.log('[SEE MESSAGE]: ',  e.data); 
        if(e.data === 'force-kick'){ 
          console.log("[SSE]: Received force kick -> signing out"); 
          signOut(); 
        }
      }
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