"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-6/12 h-8/12 bg-white rounded-lg shadow-lg flex justify-center items-center ">
        <form onSubmit={handleLogin} className="h-8/12 w-6/12 flex flex-col justify-around">
          <div className="flex flex-col">
            <label>Email</label>
            <input type="text"
            onChange={(e)=>setEmail(e.target.value)} 
            className="px-4 py-2 border 
            border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input type="password"
            onChange={(e)=>setPassword(e.target.value)} 
            className="px-4 py-2 border 
            border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
          </div>
            <div className="flex justify-center w-full">
              <button 
              type="submit"
              className="w-8/12 h-fit bg-[#38404F] 
              text-white font-bold text-2xl p-2 rounded-lg 
              hover:bg-[#334F82] hover:cursor-pointer duration-100 ease-in-out
              ">LOGIN</button>
            </div>

        </form>
      </div>
    </div>   
  );
}
