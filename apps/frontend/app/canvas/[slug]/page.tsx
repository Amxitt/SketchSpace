
import RoomCanvas from "@/app/components/RoomCanvas";
import { api } from "@/lib/axios";

export default async function CanvasPage({params}: {
    params: {
        slug: string
    }
}){


   const slug = (await params).slug; 

   const res = await api.get(`room/${slug}`)
   const roomId = res.data.id;


   
   return <RoomCanvas roomId={roomId}/>
}