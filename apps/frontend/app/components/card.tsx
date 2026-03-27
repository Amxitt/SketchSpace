
import { useRouter } from "next/navigation";
import SmallButton from "./smallbutton";
import { api } from "@/lib/axios";

export function RoomCard({name, initials, refresh}: {
    name: string, 
    initials: string,
    refresh: ()=>{}
}){
    const router = useRouter();

    function action(){
        router.push(`canvas/${name}`);
    }

    async function deleteRoom(name : string){
        try{
        const res = await api.delete(`remove/${name}`);
        refresh();
        }catch(e: any){
            alert(e.res?.data?.message || "Delete failed" );
        }
    }
    return <div className="p-2 flex h-fit w-8 md:h-fit w-90 items-center justify-between text-black font-medium bg-gray-200 shadow-md rounded
    -md shadow-gray-400">
        <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                 {initials}
            </div>
             {name}
        </div>

        <div className="flex gap-2">
            <SmallButton text="Enter" onClick={action} variant="primary"/>
            <SmallButton text= "Delete" onClick={()=>{
                deleteRoom(name)
            }} variant="secondary"/>
        </div>
        
    </div>
}