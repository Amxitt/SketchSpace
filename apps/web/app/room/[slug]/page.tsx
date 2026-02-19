import axios from "axios";
import { BACKEND_URL } from "../../../config";

interface propType{
    params: {
        slug: string
    }
}

export default function ChatRoom({params}: propType){
    const slug = params.slug;
    const roomId = getRoomId(slug);
 }


async function getRoomId(slug: string){
    const response = await axios.get(BACKEND_URL + "/room/" + slug)
    return response.data.id;
}