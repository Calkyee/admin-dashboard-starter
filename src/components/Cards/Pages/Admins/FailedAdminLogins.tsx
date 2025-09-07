import React from 'react';
import AnimatePageSwapping from "@/lib/AnimatePageSwapping";
import onClickProps from '@/lib/interfaces/onClickProps';

// Import Custom Cards
import MapFailedLogins from '@/lib/UI/MapFailedLogins';

interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<onClickProps | null>>;
}

const FailedAdminLogins =  ({setOnClick}: Props)=>{

  const ExitPage = ()=>{
    setOnClick({
      Card: undefined,
      Active: false
    });
  }

  return (
      <AnimatePageSwapping>
        <div>
          <button onClick={()=>ExitPage()}
            className='
            bg-black text-white
            px-2 py-1
            rounded
            cursor-pointer
            mb-2
            '
          >Back to Adminsitrators page</button>
        </div>
        <div className='
          w-full h-full
          grid grid-cols-4 grid-rows-4
        '>
          <div className='row-span-2 col-span-1  p-2'>
            <MapFailedLogins/>
          </div>

        </div>
      </AnimatePageSwapping>
    )
}

export default FailedAdminLogins;