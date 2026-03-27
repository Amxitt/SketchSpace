export default function SmallButton({text, onClick, variant}: {
    text: string, 
    onClick?: ()=>void ,
    variant?: "primary"| "secondary"
    
}){
    return  <div onClick={onClick}  className={`flex h-fit w-24 cursor-pointer justify-center p-2 rounded-md text-white ${variant === "primary"? "bg-black": "bg-gray-500"} `}>
               {text}
            </div>
}