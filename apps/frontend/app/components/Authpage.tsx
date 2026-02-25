"use client";

import { Input } from "./Input"
export function AuthPage({isSignin}: {
    isSignin: boolean
}){
    return <div className="w-screen h-screen bg-blue-50 flex
     justify-center items-center">
        <div className="p-10 m-2 bg-white rounded border border-gray-200 shadow-md">
            <div>
               <Input placeholder={"email"} type={"text"} />
            </div>
            <div>
                  <Input placeholder={"password"} type={"password"} />
            </div>
            <div className="flex mt-2 justify-center bg-black p-2 rounded-md
            text-white">
                <button onClick={()=>{
                    
                }} >
                    {isSignin? "Sign in": "Sign up"}
                </button>
            </div>
        </div>
    </div>
}
