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
        if(name.length < 4 ) return alert("Room name must be of minimum 4 letters");

        try{
       const res = await api.post("room", {name})
       console.log("Backend responded with " + res.data.roomId);
        setcreateModal(false)
        }catch(e: any){
            console.log("threw error" + e.response.data.message)
            alert(e.response.data?.message || "Something went wrong");
        }
    }
    return <div className="h-screen flex flex-col">
    <TopBar logout = {logout} setJoinModal={setJoinModal} setcreateModal={setcreateModal}/>

      <CreateRoomModal Open = {createModal} setOpen={setcreateModal} onSubmit = {createRoom}/>
      <JoinRoomModal Open = {joinModal} setOpen= {setJoinModal}/>
        <div id="RoomsList" className=" flex flex-col gap-3 overflow-y-auto p-4 
        max-w-xl mx-auto ">
            <div className="flex justify-between items-center mb-4 ">   
                 <h2 className="text-lg font-semibold">
                Your Rooms
            </h2>
            <span className="text-sm text-gray-500"> {rooms.length} rooms</span>

            </div>
           
           {rooms.length > 0 ? rooms.map(({id, slug})=> <RoomCard 
           key={id}
           name={slug} 
           initials= {slug.slice(0, 2).toUpperCase()}
            refresh = {refresh}

           />) : 
           <div className="text-gray-500 text-center mt-16">
                <div className="text-lg font-medium mb-2">No rooms yet</div>
                <div className="text-sm">Create your first room to start drawing</div>
            </div>}

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
   

    return <div className="w-full h-fit bg-gray-200  shadow-gray-400 sticky shadow-lg flex items-center justify-between px-4">
        <div className="flex p-2 gap-2">   
               <div onClick={()=>{setcreateModal(true)}} className="flex h-fit w-8 md:h-fit w-48   cursor-pointer justify-center bg-black p-2 rounded-md
            text-white active:scale-95">
                Create Room
               
            </div>

            
             <div onClick={()=>{setJoinModal(true)}} className="flex cursor-pointer h-fit w-48 justify-center bg-black p-2 rounded-md
            text-white active:scale-95">
                Join Room
               
            </div>

        </div>

        <div className="flex gap-2 ">
            <div id="name and logout" className="text-black" >
              Welcome, {name}
                
            </div>
            <div onClick={logout} className="text-gray-600 cursor-pointer active:scale-95">
                <LogoutIcon/>
            </div>
        </div>
      
        
           
    </div>
}