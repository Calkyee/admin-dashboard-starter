import React from 'react';
import AnimatePageSwapping from "@/lib/AnimatePageSwapping";
import setOnClickProps from '@/lib/interfaces/onClickProps';
import Position from '@/lib/interfaces/PositionProps';


interface Props {
  setOnClick: React.Dispatch<React.SetStateAction<setOnClickProps | null>>;
  position: Position;
}




const CurrentAdminsPage = ({ setOnClick, position }: Props)=>{

  const ExitPage = ()=>{
    setOnClick({
      Card: undefined, Active: false
    })
  }

  return (
    <AnimatePageSwapping position={position?.position}>
      <div className='w-full h-full flex flex-col gap-2 '>
        <div className='w-full h-fit min-h-4'>
          <button className='
            bg-black text-white py-2 px-1 rounded cursor-pointer
            '
            onClick={()=>ExitPage()}>
            Return to Administrators Page
          </button>
        </div>


      </div>
    </AnimatePageSwapping>
  )
}

export default CurrentAdminsPage;