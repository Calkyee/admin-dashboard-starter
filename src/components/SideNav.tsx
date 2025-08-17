import React from 'react'
import SideNavButton from '@/components/NavComponents/SideNavButton'; 

const SideNav = () => {
  return (
    <nav className='
    w-60 md:w-64 lg:w-72 
    min-h-full
    bg-[#38404F]
    text-white

    flex flex-col  
    items-center justify-around
    '>
      <h2 className='
      font-bold text-[24px]
      '>app_name/Admin</h2>
      <SideNavButton href='/users'>
        Users
      </SideNavButton>
      <SideNavButton href='/admins'>
        Administrators
      </SideNavButton>

    </nav>
  )
}

export default SideNav