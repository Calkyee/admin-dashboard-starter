"use client"; 
import React, {useState, useEffect} from 'react'
import { User, Admin } from '@/zod'; 

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
  useEffect(()=>{
    setLoading(true); 
    const getAdmins = async()=>{ 
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
          console.log('[GET ADMINS ERROR]: ', data); 
        }
      }  
    }
    getAdmins();
    const interval: NodeJS.Timeout = setInterval(() => {
      getAdmins();   
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
      )}


    </div>
  )
}

export default TotalAdminsVsUsersCard