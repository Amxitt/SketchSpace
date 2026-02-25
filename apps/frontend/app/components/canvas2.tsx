import { useEffect, useRef } from "react";
import { initDraw } from "../draw-2";


export function Canvas({roomId, socket}:{roomId: string, socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);

      useEffect(()=>{
        if(canvasRef.current){
            console.log("in canvas2")
            initDraw(canvasRef.current, roomId, socket);
        }
          
    })

    return <div>
        <canvas ref={canvasRef} width={2000} height={1224}></canvas>
    </div>
}