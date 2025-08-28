import React from 'react'

import AdminCard from '@/components/Cards/AdminCard';
import CurrentAdminsCard from '@/components/Cards/CurrentAdminsCard';
import CurrentAdminsLoggedInCard from '@/components/Cards/CurrentAdminsLoggedInCard';

const Page = () => {
  return (
    <>
    <div className="
      col-span-1 row-span-2 
      p-4 rounded 
      bg-white shadow-lg  
    ">
      <CurrentAdminsCard />
    </div>
    <div className="
    bg-white shadow-lg 
    p-4 rounded 
    col-span-1 row-span-2
    ">
     <CurrentAdminsLoggedInCard />
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 3</div>
    <div className="
    col-span-1 row-span-2
  bg-white 
    shadow-lg p-4 rounded 
    flex flex-col 
    ">
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 5</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-4 flex flex-col gap-5">
      <AdminCard />
    </div>
    <div className="bg-white shadow-lg p-4 rounded col-span-2 row-span-2">Card 6</div>
  </>
  )
}

export default Page