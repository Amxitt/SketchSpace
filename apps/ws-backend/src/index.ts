import { WebSocketServer, WebSocket } from "ws";   
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db";

const wss = new WebSocketServer({port: 8080});

interface User{
    ws: WebSocket,
    rooms: Set<number>, //so user cannot join same room twice leading to redundant broadcasting
    userId: string
}

const users: User[] = []

function checkUser(token: string): string | null{

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        if(typeof decoded == "string"){
            return null;
        }

        if(!decoded || !(decoded as JwtPayload).userId){
            return null;
        }
        return decoded.userId;
    }catch(e){
        return null;
    }
}

wss.on('connection', function connection(ws, request){
       console.log("new ws connection");
    const url = request.url;
    if(!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? "";
    const userId = checkUser(token);

    if(userId == null){
        ws.close()
        return ;
    }

    users.push({
        userId,
        rooms: new Set(),
        ws
    })
    console.log("new ws connection with token: " + token);

    ws.on('message', async function message(data){
        const parsedData = JSON.parse(data as unknown as string);
        const roomId = Number(parsedData.roomId)

        if(parsedData.type === "join_room"){

            const user = users.find(x => x.ws === ws);
            if(!user?.rooms.has(roomId)){
                  user?.rooms.add(roomId);
            }
        }

        if(parsedData.type === "leave_room"){
            const user = users.find(x => x.ws === ws);
            if(!user) return;
             user?.rooms.delete(parsedData.roomId)

             console.log("user just left with id " +  user.userId);
        }

        if(parsedData.type === "chat"){
            console.log("yes came here after shape was created")
            const roomId = Number(parsedData.roomId);
            const message = parsedData.message;
            try{
                console.log("room Id is: " + roomId + "message is: "+ message)
                
            await prisma.chat.create({
                data: {
                    roomId: roomId,
                    message,
                    userId
                }
            })            
            }catch(e){
                console.log("db is fuckin the shi up")
                console.log(e) ;
            }
            users.forEach(user => {
                if(user.rooms.has(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
     
     
    })
})