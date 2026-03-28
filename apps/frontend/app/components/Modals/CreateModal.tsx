import {  useState } from "react";
import CrossIcon from "../../icon/crossIcon";
import Button from "../button";
import { Input } from "../Input";

export default function CreateRoomModal({Open, setOpen, onSubmit}: {
    Open: boolean,
    setOpen: (a: boolean)=>void,
    onSubmit: (RoomName: string, setOpen: (a: boolean)=>void) => void
    
}){
    const [RoomName, SetRoomName] = useState("");


  
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
                <div>
                        <Input placeholder={"Room Name"} type="text" onChange={(e:any)=>{SetRoomName(e.target.value)}} />
                        <div className="pl-4 pt-2" onClick={()=>{
                            onSubmit(RoomName, setOpen)
                            }}> 
                             <Button text="Create" />
                        </div>
                       
    
                 </div>
                
                </div>
            </div>
            
    
        </div> }
        </div>
    }