'use client'; 
import React, { useState } from 'react'

import onClickProps from '@/lib/interfaces/onClickProps'; 

import AdminCard from '@/components/Cards/AdminCard';
import CurrentAdminsCard from '@/components/Cards/CurrentAdminsCard';
import CurrentAdminsLoggedInCard from '@/components/Cards/CurrentAdminsLoggedInCard';
import WeeklyUsersCard from '@/components/Cards/WeeklyUsersCard';
import FailedAdminCard from '@/components/Cards/FailedAdminCard'; 
import TotalAdminsVsUsersCard from '@/components/Cards/TotalAdminsVsUsersCard';

// Card Pages 
import LoggedInAdmins from '@/components/Cards/Pages/Admins/LoggedInAdmins';

const Page = () => {
  const [onClick, setOnClick] = useState<onClickProps | null>(null); 
  const topCardsCss = ` 
  col-span-1 row-span-1
  rounded 
  shadow-lg 
  bg-white
  `
  const leftCardsCss = `
  col-span-2 row-span-2
  bg-white shadow-lg 
  p-4 rounded 
  `
  const menuCardCss = `
  col-span-2 row-span-4
  bg-white shadow-lg 
  p-4 rounded  
  flex flex-col gap-5
  `
  if(onClick?.Card === 'CurrentsLoggedIn' && onClick.Active){ 
    return ( 
      <LoggedInAdmins setOnClick={setOnClick}/>
    )
  }

  return (
    <>
    <div className={topCardsCss}>
      <CurrentAdminsCard />
    </div>
    <div className={topCardsCss}>
     <CurrentAdminsLoggedInCard setOnClick={setOnClick}/>
    </div>
    <div className={topCardsCss}>
      <WeeklyUsersCard />
    </div>
    <div className={topCardsCss}>
      <FailedAdminCard />
    </div>
    <div className={leftCardsCss}>Card 5</div>
    <div className={menuCardCss}>
      <AdminCard />
    </div>
    <div className={leftCardsCss}>
      <TotalAdminsVsUsersCard />
    </div>
  </>
  )
}

export default Page