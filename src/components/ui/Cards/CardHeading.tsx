'use client'; 
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'; 

interface CardHeadingProps { 
  children: React.ReactNode; 
  DetailPageUrl: string; 
}

interface ViewMoreButtonProps { 
  setIsViewMoreActive: React.Dispatch<React.SetStateAction<boolean>>; 
  isViewMoreActive: boolean; 
  DetailPageUrl: string; 
}

const ViewMoreButton = ({setIsViewMoreActive, isViewMoreActive, DetailPageUrl}: ViewMoreButtonProps)=>{ 
  const router = useRouter(); 

  const handleClick = ()=>{ 
    setIsViewMoreActive(prev => !prev);
    router.push(DetailPageUrl);  
  }
  
  return ( 
    <button className='
      w-6/6 h-fit px-1 py-2
    bg-black  font-semibold
      rounded
    ' onClick={()=>handleClick}>
      <h2 className='text-white'>VIEW MORE</h2>
    </button>
  )
}

const CardHeading = ({children, DetailPageUrl}: CardHeadingProps) => {
  const [isViewMoreActive, setIsViewMoreActive] = useState(false); 

  return (
    <div className='
      w-full h-4/12
      p-2
      flex items-center justify-between
      
    '>
      <div className='text-black font-bold'>
        {children}
      </div>
      <div className=''>
        <ViewMoreButton setIsViewMoreActive={setIsViewMoreActive} isViewMoreActive={isViewMoreActive} DetailPageUrl={DetailPageUrl}/>
      </div>
    </div>
  )
}




export default CardHeading