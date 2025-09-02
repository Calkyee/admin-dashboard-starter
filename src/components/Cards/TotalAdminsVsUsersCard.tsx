"use client"; 
import React, {useState, useEffect} from 'react'
import { User, Admin, Session, SessionSchema } from '@/zod'; 

type OnMouseEnterProps = { 
  field: 'admins' | 'Users'; 
  x: number; 
  y: number;
}

const TotalAdminsVsUsersCard = () => {
  const [admins, setAdmins] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);  
  const [isLoading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [onMouseEnter, setOnMouseEnter] = useState<OnMouseEnterProps | null>(null);
  const [previous7DaysLogin, setPrevious7DaysLogin] = useState<number | null>(null);  
  useEffect(()=>{
    setLoading(true); 
    const getPrevious7DaysLogins = async()=>{ 
      const res = await fetch('/api/secure/sessions/getSessions', {credentials: 'include'}); 
      let data; 
      try{
        data = await res.json();
        console.info('[GET PREVIOUS 7 DAYS]: Called Successfully'); 
        const sessions: Session[] = data.currentSessions; 
        console.info('[SESSIONS]: ', sessions); 
        
        for(const s of sessions){ 
          const validated = SessionSchema.safeParse(s); 
          if(!validated.success){ 
            console.error('[VALIDATION FAILED]: ', validated.error.flatten()); 
            return; 
          }
        }
        // Beyound this point all data is validated
        const now = new Date(); 
        const previous7Days = new Date(); 
        previous7Days.setDate(now.getDate() - 7); 
      
        const previous7DaysSessions = sessions.filter(prev => { 
          const date = new Date(prev.lastLoginDate); 
          return date >= previous7Days && date <= now; 
        }); 
        console.info('[PREVIOUS 7 DAYS SESSIONS]: ', previous7DaysSessions); 
        setPrevious7DaysLogin(previous7DaysSessions.length ?? 0); 

      }catch(err){ 
        if(err && !res.ok){ 
          data = await res.text(); 
          setError(data); 
          console.error("[GET SESSIONS ERROR]: ", data);
        }
      }
    }

    const getAdmins = async()=>{ 
      getPrevious7DaysLogins();
      const res = await fetch('/api/secure/admins/getAdmins', {credentials: 'include'}); 
      let data; 
      try{
        data = await res.json(); 
        console.log('[GET ADMINS RESPONSE]: ', data); 
        const resAdmins: Admin[] = data.admins; 
        setAdmins(resAdmins.length); 
        setUsers(5) // Dummy data cause the Users route does not exist yet
        setLoading(false); 
      }catch(err){ 
        if(err && !res.ok){
          data = await res.text(); 
          setError(data); 
          console.error('[GET ADMINS ERROR]: ', data); 
        }
      }  
    }
    getAdmins(); 
    const interval: NodeJS.Timeout = setInterval(() => {
      getAdmins();   
      getPrevious7DaysLogins();
    }, 1000 * 60 * 5);

    return ()=> clearInterval(interval); 
  }, []); 

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <h2 className='font-bold'>Admins Vs Users</h2>
      {isLoading && (<div className='text-red-500'>Loading...</div>)}
      {error && ( 
        <div className='text-red-500'>Failed to get data</div>
      )}
      {!isLoading && (
        <>
        <div className="w-full h-10 bg-red-500"
          onMouseEnter={(e)=>setOnMouseEnter({field: "admins", x: e.clientX, y: e.clientY})}
          onMouseMove={(e)=>setOnMouseEnter(prev => prev ? {...prev, x: e.clientX, y: e.clientY}: null)}
          onMouseLeave={()=>setOnMouseEnter(null)}
          >
          <div
            style={{ width: `${Math.min((users / admins) * 100, 100)}%` }}
            className="bg-green-500 h-full"
            onMouseEnter={(e)=>setOnMouseEnter({field: 'Users', x: e.clientX, y: e.clientY})}
            onMouseMove={(e)=>setOnMouseEnter(prev => prev ? {...prev, x: e.clientX, y: e.clientY } : null)}
            onMouseLeave={()=>setOnMouseEnter(null)}
          />
          { onMouseEnter?.x !== null && onMouseEnter?.y  && ( 
            <div className='absolute bg-black text-white text-xs px-2 py-1 rounded'
              style={{top: onMouseEnter.y + 10, left: onMouseEnter.x + 10}}
            >
              {onMouseEnter.field}: {onMouseEnter.field === 'admins' ? admins : users} 
            </div>
          )

          }
        </div> 
        <div>
          <h2 className='font-bold'>Previous 7 days logins: {previous7DaysLogin}</h2>
        </div>
        </>
      )}
    </div>
  )
}

export default TotalAdminsVsUsersCard