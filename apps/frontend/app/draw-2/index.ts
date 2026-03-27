import axios from "axios";
import { HTTP_BACKEND } from "../config";
import { api } from "@/lib/axios";

type Shape = {
    type: "rect", 
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number
} | {
    type: "line",
    x: number,
    x2: number,
    y: number,
    y2: number;
}


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket){
    console.log("start of initDraw")
    const ctx = canvas.getContext('2d');
    
    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if(!ctx) return;

    socket.onmessage = (event)=>{
        const message = JSON.parse(event.data); 
        if(message.type == "chat"){
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape); //update the state variable.
            clearCanvas(existingShapes, canvas, ctx); //then call the clear canvas which re-renders teh updated state.
        }
    }
    
    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;
    let width = 0;
    let height = 0;

    canvas.addEventListener("mousedown", (e)=>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    
        canvas.addEventListener("mouseup", (e)=>{
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width: width,
            height: height
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: roomId
        }))
    })

        canvas.addEventListener("mousemove", (e)=>{
        if(clicked){
            width = e.clientX - startX;
            height = e.clientY - startY;

            clearCanvas(existingShapes, canvas, ctx);

            ctx.strokeStyle = "rgba(255, 255, 255)" //white
            ctx.strokeRect(startX, startY, width, height);
        }
     })
}
function clearCanvas(existingShapes: Shape[],canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)" //black
    ctx.fillRect(0, 0 , canvas.width, canvas.height);


    existingShapes.map((shape)=>{
        if(shape.type == "rect"){
            ctx.strokeStyle = "rgba(255, 255, 255)" //white
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }

        if(shape.type == "line"){

        }

    })
    return;
}

async function getExistingShapes(roomId: string){
       console.log("yes it reached to getexisting shapes with roomId "+ roomId);
    const res = await api.get(`/chats/${roomId}`);
 
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}