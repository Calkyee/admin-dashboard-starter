import React from 'react'

import AdminCard from '@/components/Cards/AdminCard';
import CurrentAdminsCard from '@/components/Cards/CurrentAdminsCard';
import CurrentAdminsLoggedInCard from '@/components/Cards/CurrentAdminsLoggedInCard';
import WeeklyUsersCard from '@/components/Cards/WeeklyUsersCard';
import FailedAdminCard from '@/components/Cards/FailedAdminCard'; 

const Page = () => {
  const topCardsCss = ` 
  col-span-1 row-span-2 
  p-4 rounded 
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

  return (
    <>
    <div className={topCardsCss}>
      <CurrentAdminsCard />
    </div>
    <div className={topCardsCss}>
     <CurrentAdminsLoggedInCard />
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
    <div className={leftCardsCss}>Card 6</div>
  </>
  )
}

export default Page