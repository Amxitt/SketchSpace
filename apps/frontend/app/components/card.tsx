
import { useRouter } from "next/navigation";
import SmallButton from "./smallbutton";
import { api } from "@/lib/axios";




export function RoomCard({name, initials, refresh}: {
    name: string, 
    initials: string,
    refresh: ()=>{}
}){
    const router = useRouter();

    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500, bg-violet-500, bg-yellow-500, bg-red-400"];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

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
    return <div className="p-2 flex h-fit w-8 md:h-fit w-90 items-center justify-between text-black font-medium bg-white shadow-sm hover:shadow-md rounded
    -md shadow-gray-400
    hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">
        <div className="flex gap-2 items-center active:scale-[0.98]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${randomColor}`}>
                 {initials}
            </div>
             {name}
        </div>

        <div className="flex gap-3 ">
            <SmallButton text="Enter" onClick={action} variant="primary"/>
            <SmallButton text= "Delete" onClick={()=>{
                deleteRoom(name)
            }} variant="secondary"/>
        </div>
        
    </div>
}