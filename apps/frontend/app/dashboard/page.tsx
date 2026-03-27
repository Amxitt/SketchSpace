"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import CreateRoomModal from "../components/Modals/CreateModal";
import JoinRoomModal from "../components/Modals/JoinRoomModal";


import { api } from "@/lib/axios";
import { LogoutIcon } from "../icon/logouticon";
import { useRouter } from "next/navigation";
import { RoomCard } from "../components/card";
import { useFetchRooms } from "../hooks/useFetchRooms";

export default function Dashboard(){
    const [createModal , setcreateModal] = useState(false);
    const [joinModal, setJoinModal] = useState(false);
    
    const {rooms, refresh} = useFetchRooms();
    const router = useRouter()

    useEffect(()=>{
        
        refresh();
    },[createModal])

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        console.log("control reached here");
        router.push("/")
    }
    
    async function createRoom(name: string, setcreateModal: (a: boolean)=>void){
        try{
       const res = await api.post("room", {name})
       console.log("Backend responded with " + res.data.roomId);
        setcreateModal(false)
        }catch(e){
            alert("backend fucked up");
        }
    }
    return <div className="h-screen flex flex-col">
    <TopBar logout = {logout} setJoinModal={setJoinModal} setcreateModal={setcreateModal}/>

      <CreateRoomModal Open = {createModal} setOpen={setcreateModal} onSubmit = {createRoom}/>
      <JoinRoomModal Open = {joinModal} setOpen= {setJoinModal}/>
        <div id="RoomsList" className=" flex flex-col gap-2 overflow-y-auto p-4 ">
           {rooms.map(({id, slug})=> <RoomCard 
           key={id}
           name={slug} 
           initials= {slug.slice(0, 2).toUpperCase()}
            refresh = {refresh}

           />)}

        </div>
    </div>
  
}

function TopBar({setcreateModal, setJoinModal, logout}: {
    setcreateModal: Dispatch<SetStateAction<boolean>>,
    setJoinModal: Dispatch<SetStateAction<boolean>>,
    logout: ()=>void
}){
    const [name, setName] = useState("");

    useEffect(()=>{
        const email = localStorage.getItem("name");
        const extracted = email?.split("@")[0].toUpperCase() || "";
        setName(extracted);
    },[])
   

    return <div className="w-full h-fit bg-gray-200  shadow-gray-400 sticky shadow-lg flex items-center justify-between">
        <div className="flex p-2 gap-2">   
               <div onClick={()=>{setcreateModal(true)}} className="flex h-fit w-8 md:h-fit w-48   cursor-pointer justify-center bg-black p-2 rounded-md
            text-white ">
                Create Room
               
            </div>

            
             <div onClick={()=>{setJoinModal(true)}} className="flex cursor-pointer h-fit w-48 justify-center bg-black p-2 rounded-md
            text-white ">
                Join Room
               
            </div>

        </div>

        <div className="flex gap-2 ">
            <div id="name and logout" className="text-black" >
              Welcome, {name}
                
            </div>
            <div onClick={logout} className="text-gray-600 cursor-pointer">
                <LogoutIcon/>
            </div>
        </div>
      
        
           
    </div>
}