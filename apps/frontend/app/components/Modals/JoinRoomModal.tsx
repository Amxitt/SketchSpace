
import CrossIcon from "@/app/icon/crossIcon"
import { Input } from "../Input"
import Button from "../button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function JoinRoomModal({Open, setOpen}: {
    Open: boolean,
    setOpen: (a: boolean)=>void
}){
   
    const [slug, setSlug] = useState("");

    const router = useRouter();

    function action(){
        if(slug === ""){
            return;
        }
        router.push(`canvas/${slug}`);
    }
    


    return <div>
     { Open && <div className="h-screen w-screen bg-gray-500 top-0 left-0
      fixed opacity-100">

        <div className="h-screen w-screen flex justify-center items-center fixed
        top-0 left-0 ">
            <div className="w-72 h-48 p-4 bg-white flex flex-col 
            rounded-md
            justify-center items-center gap-2 relative">
                <div onClick={()=> setOpen(false)} className="absolute top-3 right-3 cursor-pointer active:scale-95">
                    <CrossIcon size= {"md"} />
                </div>
            <div className="flex flex-col gap-3 items-center">
                    <Input placeholder={"Room Name"} type="text" onChange={(e)=>{setSlug(e.target.value)}} />
                    <Button text="Join" onClick={action}/>

             </div>
            
            </div>
        </div>
        

    </div> }
    </div>
}