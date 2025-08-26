'use client'; 
import React from 'react'
 

import { UserSchema } from '@/zod';
import { z } from 'zod';
import AdminCard from '@/components/Cards/AdminCard';

type userType = z.infer<typeof UserSchema>


const page = () => {
  return (
    <>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2 ">Card 1</div>
    <div className="bg-white shadow-lg p-4 rounded col-span-1 row-span-2">Card 2</div>
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

export default page