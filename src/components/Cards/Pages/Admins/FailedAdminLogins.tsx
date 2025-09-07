import React from 'react';
import AnimatePageSwapping from "@/lib/AnimatePageSwapping";
import onClickProps from '@/lib/interfaces/onClickProps';

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
            '
          >Back to Adminsitrators page</button>
        </div>
        <div>

        </div>
      </AnimatePageSwapping>
    )
}

export default FailedAdminLogins;