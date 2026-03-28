export default function SmallButton({text, onClick, variant}: {
    text: string, 
    onClick?: ()=>void ,
    variant?: "primary"| "secondary"
    
}){
    return  <div onClick={onClick}  className={`flex h-fit w-24 cursor-pointer justify-center p-2 rounded-md active:scale-95 text-white ${variant === "primary"? "bg-black hover:bg-gray-800 transition": "bg-gray-400 hover:bg-red-500 transition"} `}>
               {text}
            </div>
}