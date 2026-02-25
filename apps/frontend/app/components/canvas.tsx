"use client";

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw-logic";
import { WS_URL } from "../config";

export function Canvas({roomId}: {roomId: string}){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null); //weird line is generics do learn about them.

    useEffect(()=>{ //to connect to ws
        const ws = new WebSocket(WS_URL);
        ws.onopen = ()=>{
            setSocket(ws);
        }
    },[]);

    useEffect(()=>{
        if(canvasRef.current){
            const canvas = canvasRef.current;
            
            initDraw(canvas, roomId);
        }
    }, [canvasRef])

    if(!socket){
        return <div>
            Connecting to Server...
        </div>
    }
    return <div >
        <canvas className="border" ref={canvasRef} width={2000} height={2000}></canvas>
    </div>
}