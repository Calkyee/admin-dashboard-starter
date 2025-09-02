"use client"; 
import React, {useState, useEffect} from 'react'
import { User, Admin } from '@/zod'; 

type dataPoint = { 
  name: string; 
  value: number; 
}

const TotalAdminsVsUsersCard = () => {
  const [admins, setAdmins] = useState<Admin[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);  
  const [chartData, setChartData] = useState<dataPoint[]>([
    {name: 'Admins', value: admins?.length ?? 0}, 
    {name: 'Users', value: admins?.length ?? 0}
  ]); 

  return (
    <>
    
    </>
  )
}

export default TotalAdminsVsUsersCard