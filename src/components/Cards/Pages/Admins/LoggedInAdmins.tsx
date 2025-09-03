import React, { useEffect, useState } from 'react';
import onClickProps from '@/lib/interfaces/onClickProps';
import { Session, SessionSchema } from "@/zod"; 

interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>;
}

const LoggedInAdmins = ({ setOnClick }: Props) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [sessions, setSessions] = useState(); 

  useEffect(() => {
    
    const timeout = setTimeout(() => setAnimateIn(true), 2); // slight delay triggers transition
    const getSessions = async()=>{ 

    }
    // Initial fetch 
    getSessions(); 
    
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const ExitPage = () => {
    setOnClick({ Active: false, Card: undefined });
  };

  return (
    <div
      className={`p-4 col-span-4 row-span-4 rounded shadow-lg bg-white flex flex-col transition-all duration-500 ease-in-out transform ${
        animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <button
        className='bg-black w-2/12 text-white px-2 py-1 rounded cursor-pointer'
        onClick={ExitPage}
      >
        Back to Administrators Page
      </button>
      <div className='
        w-full h-full grid grid-rows-4 grid-cols-4 pt-4
        border-1 border-black 
      '>
        <div className='
        row-span-2 col-span-1 border-1 border-blue-500
        '>
          
        </div>      

      </div>
    </div>
  );
};

export default LoggedInAdmins;