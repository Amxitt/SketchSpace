import { api } from "@/lib/axios";
import { useState } from "react";

export function useFetchRooms(){
    const [rooms, setRooms] = useState<any[]>([]);

    async function refresh(){
        const res = await api.get("my-rooms")
        setRooms(res.data.rooms ?? [])
    }

    return {rooms, refresh}
}