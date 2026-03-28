"use client";
import { useState } from "react";
import { Input } from "./Input"
import { UserInfoType } from "../signin/page";
export function AuthPage({isSignin, onSubmit}: {
    isSignin: boolean,
    onSubmit: ({username, password}: UserInfoType)=>void 
}){
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="w-screen h-screen bg-blue-50 flex
     justify-center items-center">
        <div className="p-10 m-2 bg-white rounded border border-gray-200 shadow-md">
            <div>
               <Input onChange= {(e: any)=> setUsername(e.target.value)} placeholder={"email"} type={"text"} />
            </div>
            <div>
                  <Input onChange = {(e: any)=>setPassword(e.target.value)} placeholder={"password"} type={"password"} />
            </div>
            <div onClick={()=>{
                    onSubmit({username, password})
                }} className="flex mt-2 justify-center bg-black p-2 rounded-md
            text-white cursor-pointer active:scale-95">
        
                    {isSignin? "Sign in": "Sign up"}
              
            </div>
        </div>
    </div>
}
