import React from 'react'
import { useRouter } from 'next/navigation'; 

const LogoutButton = () => {
  const router = useRouter(); 

  const handleLogout = ()=>{ 
    router.push('/'); 
  }
  
  return (
    <button onClick={()=>handleLogout()}>
      Logout
    </button>
  )
}

export default LogoutButton