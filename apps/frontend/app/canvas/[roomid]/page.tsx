import  {Canvas}  from "@/app/components/canvas";

export default async function CanvasPage({params}:{
    params: {
        roomid: string
    }
}){
    const roomid = (await params).roomid
    console.log(roomid);
  
    return <Canvas roomId= {roomid}/>
}