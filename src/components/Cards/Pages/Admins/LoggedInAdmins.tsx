import React, { useEffect, useState } from 'react';
import AnimatePageSwapping from '@/lib/AnimatePageSwapping'; 
import onClickProps from '@/lib/interfaces/onClickProps';
import { Session, SessionSchema } from "@/zod"; 

interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>;
}

const LoggedInAdmins = ({ setOnClick }: Props) => {
  const [isLoading, setIsLoading] = useState(true);  


  const ExitPage = () => {
    setOnClick({ Active: false, Card: undefined });
  };

  return (
    <AnimatePageSwapping>
      <button
        className='bg-black w-2/12 text-white px-2 py-1 rounded cursor-pointer'
        onClick={ExitPage}
      >
        Back to Administrators Page
      </button>
      <div className='w-full h-full grid grid-rows-4 grid-cols-8 pt-4'>
        <div className='row-span-4 col-span-3'>
          <MapLoggedInAdmins />
        </div>
      </div>
    </AnimatePageSwapping>
    
  );
};



const MapLoggedInAdmins = ({})=>{ 
  const [sessions, setSessions] = useState<Session[] | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(()=>{
    setIsLoading(true); 
    const getSessions = async ()=>{ 
      const res = await fetch ('/api/secure/sessions/getSessions', {credentials: 'include'}); 
      try{
        const data = await res.json(); 
        const allSessions: Session[] = data.currentSessions; 

        for(const s of allSessions){ 
          const validated = SessionSchema.safeParse(s); 
          if(!validated.success){ 
            console.log('[VALIDATION ERROR]: ', validated.error.flatten())
            return; 
          }
        }

        // All data is Valid beyound this point. 
        setSessions(allSessions); 
        setIsLoading(false); // Runs every time no matter what  
      }catch(err){  
        console.log('[ERROR MAPPING ADMINS]: ', err); 
      }
    }


    

    getSessions(); 

    const timeout: NodeJS.Timeout = setInterval(()=>getSessions(), 1000 * 60 * 5); 
    return ()=> clearInterval(timeout); 
  },  []); 

  const handleDeleteSessions = ({id}: {id: string})=>{ 

  }
  return ( 
    <>
      { isLoading && ( <div>Loading...</div>) }
      { !isLoading && sessions && ( 
        <div className='flex-1'>
          <h2 className='font-bold pb-2'>Current Logged In Users</h2>
          <ul className='w-full h-full flex flex-col gap-2'>
            { sessions.map((s)=>( 
              <li key={s.id} 
                className='
                  w-full h-fit min-h-4 
                  bg-gray-400 text-white 
                  p-2 rounded 
                  hover:cursor-pointer hover:bg-gray-600 
                  duration-100 ease-in-out transition-all
                '>
                <div className='flex flex-row justify-between'>
                  <h2>UserId: {s.userId}</h2>
                  <button onClick={()=>handleDeleteSessions({id: s.id})} 
                    className='
                      text-black 
                      hover:bg-gray-400 p-1 rounded cursor-pointer
                    '>
                    Kick user from session
                  </button>
                </div>
              </li>
            ))

            }
          </ul>
        </div>
      )}
  
    </>
  )

}

export default LoggedInAdmins;