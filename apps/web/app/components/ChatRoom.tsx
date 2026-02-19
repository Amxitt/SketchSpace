import axios from "axios"
import { BACKEND_URL } from "../../config"

export async function ChatRoom({id}: {
    id: string
}){
    const messages = await getChats(id);
}


export async function getChats(roomId: string){
    const res = await axios.get(BACKEND_URL + '/chats/' + roomId);
    return res.data.messages;
}