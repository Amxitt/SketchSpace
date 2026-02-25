"use client";
import { useEffect, useRef, useState } from "react"
import { WS_URL } from "../config";
import { Canvas } from "./canvas2";



export default function RoomCanvas({roomId}: {roomId: string}){
    
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTYwOGQyMS1iMmRiLTRhMTktYjNlYy04NWY5NThhODlhN2QiLCJpYXQiOjE3NzIwMTQxNzB9.I73gUvvfiFwVtkzbyMcm5TIkJ0Uzsw4ORmzOpvUiOjs`); //need to send token as well to connect.

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


    return <div className="">
        <Canvas roomId= {roomId} socket = {socket}/>

    </div>
}