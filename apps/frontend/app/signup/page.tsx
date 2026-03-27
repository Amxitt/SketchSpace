'use client'
import { signup } from "@/services/auth";
import { AuthPage } from "../components/Authpage";
import { UserInfoType } from "../signin/page";
import { useRouter } from "next/navigation";



export default function Signup(){
    const router = useRouter();
    async function handleSubmit({username, password}: UserInfoType){
        if(username === "" || password === "") return;
        try{
            const res = await signup({username, password}) //api req
            router.push('/signin')
        }catch(e){
            alert("failed")
        }
    }
    return <AuthPage isSignin = {false} onSubmit={handleSubmit} />
}