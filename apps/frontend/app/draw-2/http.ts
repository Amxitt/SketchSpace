import { api } from "@/lib/axios";

export async function getExistingShapes(roomId: string){
       console.log("yes it reached to getexisting shapes with roomId "+ roomId);
    const res = await api.get(`/chats/${roomId}`);
 
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}