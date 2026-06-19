import { useEffect, useRef, useState } from "react";
import IconButton from "../icons/icons";
import { CircleIcon, PenIcon, RectangleHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Game } from "../draw-logic/Game"

export type Tool =  "pen" | "circle" | "rect";

export function Canvas({roomId, socket}:{roomId: string, socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
     const [game, setGame] = useState<Game>();
   const [selectedTool, setSelectedTool] = useState<Tool>("rect");
 
   useEffect(() => {
    if (game) {
        game?.setTool(selectedTool);
    }
}, [selectedTool, game]);

      useEffect(()=>{
        if(canvasRef.current){
          const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }
          
    },[canvasRef])

   
    return <div className="h-screen overflow-hidden">
        <div style={{
            position: "absolute",
            top:10,
            left: 10
        }}>
             <TopBar Tool={selectedTool} SetTool={setSelectedTool} socket={socket} roomId={roomId}/>
        </div>
           
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
}


function TopBar({Tool, SetTool, socket, roomId}:{
    Tool: Tool,
    SetTool: (s: Tool)=>void,
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
                <IconButton icon= {<PenIcon/>} onClick={()=>{SetTool("pen")}} activated= {Tool ==="pen"}/>
                <IconButton icon= {<CircleIcon/>} onClick={()=>{SetTool("circle")}} activated= {Tool ==="circle"}/>
                <IconButton icon= {<RectangleHorizontalIcon/>} onClick={()=>{SetTool("rect")}} activated= {Tool ==="rect"}/>
        </div>

        <div className="fixed right-5 ">
            <div onClick={leaveRoom}   className={`flex h-fit w-24 cursor-pointer justify-center p-2 rounded-md text-white 
                bg-red-700 active:scale-95 `}>
              Leave
            </div>
        </div>
    </div>
     
}