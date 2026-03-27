import { ReactNode } from "react"

export default function IconButton({icon, onClick, activated}: {
    icon: ReactNode,
    onClick: ()=> void,
    activated: boolean
}){
    console.log(activated)
    return <div onClick={onClick} className={`m-2 cursor-pointer rounded-full border p-2
    hover:bg-gray ${activated ? "text-cyan-500": "" }`}>
        {icon}
    </div>
}