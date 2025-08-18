"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { UserSchema } from '@/zod'; 

const LoginSchema = UserSchema.pick({
  email: true, 
  passwordHash: true
}); 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = LoginSchema.safeParse({
      email,
      passwordHash: password
    })

    if(!result.success){ 
      setError(result.error?.message); 
      return; 
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/"; // or redirect wherever you want
    }
  };
  const inputClasses = error 
  ? `
    px-4 py-2 border 
    border-gray-300 border-red-500 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    
  `
  : `
    px-4 py-2 border 
    border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500
  
  `
  const labelClasses = error 
  ? `
    text-red-500
  `
  : ``
  const buttonClasses = error 
  ? `
  w-8/12 h-fit bg-[#38404F]  
  text-white font-bold text-2xl p-2 rounded-lg 
  hover:cursor-not-allowed
  hover:bg-red-900 duration-100 ease-in-out    
  `
  : `
  w-8/12 h-fit bg-[#38404F] 
  text-white font-bold text-2xl p-2 rounded-lg 
  hover:bg-[#334F82] hover:cursor-pointer duration-100 ease-in-out
  `
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-6/12 h-8/12 bg-white rounded-lg shadow-lg flex justify-center items-center ">
        <form onSubmit={handleLogin} className="h-8/12 w-6/12 flex flex-col justify-around">
          <div className="flex flex-col">
            <label className={labelClasses}>{error ? error : 'Email'}</label>
            <input type="text"
            onChange={(e)=>setEmail(e.target.value)} 
            className={inputClasses}
            required
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClasses}>{error? error : 'Password'}</label>
            <input type="password"
            onChange={(e)=>setPassword(e.target.value)} 
            className={inputClasses}
            required
            />
          </div>
            <div className="flex justify-center w-full">
              <button 
              type="submit"
              className={buttonClasses}>LOGIN</button>
            </div>

        </form>
      </div>
    </div>   
  );
}
