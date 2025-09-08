import React, {useState} from 'react';
import AnimatePageSwapping from "@/lib/AnimatePageSwapping";
import onClickProps from '@/lib/interfaces/onClickProps';

// Import Custom Cards
import MapFailedLogins from '@/lib/UI/MapFailedLogins';
import {z} from "zod";
import {FailedLoginSchema} from "@/zod";

interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>;
}

const FailedLoginArraySchema = z.array(FailedLoginSchema);
type FailedLoginArrayType = z.infer<typeof FailedLoginArraySchema>;


const FailedAdminLogins =  ({setOnClick}: Props)=>{
  const mockData = [
    {
      id: "0", userId: "0", failedLogin: true, loginAttempts: 2
    },
    {
      id: "1", userId: "1", failedLogin: true, loginAttempts: 1
    },
    {
      id: "2", userId: "2", failedLogin: true, loginAttempts: 2
    },
    {
      id: "3", userId: "3", failedLogin: true, loginAttempts: 2
    },
    {
      id: "4", userId: "4", failedLogin: true, loginAttempts: 2
    },
    {
      id: "5", userId: "5", failedLogin: true, loginAttempts: 2
    }
  ] as FailedLoginArrayType;

  const [useMockData, setUseMockdata] = useState<FailedLoginArrayType>(mockData);



  const ExitPage = ()=>{
    setOnClick({
      Card: undefined,
      Active: false
    });
  }

  return (
      <AnimatePageSwapping>
        <div className='w-full h-fit mb-2'>
          <button onClick={()=>ExitPage()}
            className='
            bg-black text-white
            px-2 py-1
            rounded
            cursor-pointer
            '
          >Back to Adminsitrators page</button>
        </div>
        <div className='
          w-full h-full
          grid grid-cols-4 grid-rows-4
        '>
          <div className='row-span-2 col-span-1  p-2'>
            <MapFailedLogins useMockData={useMockData}/>
          </div>
          <div className='row-span-1 col-span-1 p-2'>
            <PieChartForFailedAdminLogins useMockData={useMockData}/>
          </div>
        </div>
      </AnimatePageSwapping>
    )
}

export default FailedAdminLogins;