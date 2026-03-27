import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw-2";
import IconButton from "../icons/icons";
import { CircleIcon, PenIcon, RectangleHorizontal, RectangleHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Shape =  "Pen" | "Circle" | "Rectangle";

export function Canvas({roomId, socket}:{roomId: string, socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [Tool , setTool] = useState<Shape>("Rectangle");
 


      useEffect(()=>{
        if(canvasRef.current){
            initDraw(canvasRef.current, roomId, socket);
        }
          
    },[canvasRef])

   
    return <div className="h-screen overflow-hidden">
        <div style={{
            position: "absolute",
            top:10,
            left: 10
        }}>
             <TopBar Tool={Tool} SetTool={setTool} socket={socket} roomId={roomId}/>
        </div>
           
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
}


function TopBar({Tool, SetTool, socket, roomId}:{
    Tool: Shape,
    SetTool: (s: Shape)=>void,
    socket: WebSocket,
    roomId: string
}){
    const router = useRouter()

     function leaveRoom(){
        socket.send(JSON.stringify({
            type: "leave_room",
            roomId: roomId
        }))
        
        router.push("/dashboard")

//  socket.send(JSON.stringify({
//             type: "chat",
//             message: JSON.stringify({
//                 shape
//             }),
//             roomId: roomId
//         }))

    }


    return <div className="w-full items-center flex justify-between">
            <div className="bg-black text-white flex gap-1">
                <IconButton icon= {<PenIcon/>} onClick={()=>{SetTool("Pen")}} activated= {Tool ==="Pen"}/>
                <IconButton icon= {<CircleIcon/>} onClick={()=>{SetTool("Circle")}} activated= {Tool ==="Circle"}/>
                <IconButton icon= {<RectangleHorizontalIcon/>} onClick={()=>{SetTool("Rectangle")}} activated= {Tool ==="Rectangle"}/>
        </div>

        <div className="fixed right-5 ">
            <div onClick={leaveRoom}   className={`flex h-fit w-24 cursor-pointer justify-center p-2 rounded-md text-white 
                bg-red-700 `}>
              Leave
            </div>
        </div>
    </div>
     
}