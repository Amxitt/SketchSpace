'use client'
import axios from "axios";
import { AuthPage } from "../components/Authpage";
import { HTTP_BACKEND } from "../config";
import { signin } from "@/services/auth";
import { useRouter } from "next/navigation";

export interface UserInfoType{
    username: string, 
    password: string
}


export default function Signin(){
    const router = useRouter();

    async function handleSubmit({username, password}: UserInfoType){
       try{
        const res = await signin({username, password}) //api call for signin
        
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("name", res.data.username)        
        
        router.push('/dashboard')
       }catch(e){
        alert("failed")
       }
    }
    
    return <AuthPage isSignin = {true} onSubmit={handleSubmit}/>
}