"use client";
import { useEffect, useState } from "react"
import { WS_URL } from "../config";
import { Canvas } from "./canvas";



export default function RoomCanvas({roomId}: {roomId: string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const ws = new WebSocket(`${WS_URL}?token=` + token); //need to send token as well to connect.

        ws.onopen = ()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }

    },[])

    if(!socket){
        return <div>
            connecting to server...
        </div>
    }

    return <div >
        <Canvas roomId= {roomId} socket = {socket}/>
    </div>
}