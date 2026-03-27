export default function Button({text, onClick}: {
    text: string, 
    onClick?: ()=>void,
    
}){
    return  <div onClick={onClick}  className="flex h-fit w-48 cursor-pointer justify-center bg-black p-2 rounded-md text-white ">
               {text}
            </div>
}