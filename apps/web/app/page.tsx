
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  return (
    <div style={{display: 'flex', 
    justifyContent: 'center',
     alignItems: "center",
     height: "100vh",
     width: "100vw"}}>
      <div >
      <input style={{ padding: 10}}
       onChange={(e)=>{setSlug(e.target.value)}} placeholder="Room id" ></input>
      </div>
     <button onClick={()=>{
        router.push(`/room/${slug}`);
     }}
     style={{padding: 10}} >Join Room</button>
    </div>
  );
}
