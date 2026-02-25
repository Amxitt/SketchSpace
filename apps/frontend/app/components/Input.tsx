export function Input({placeholder, type}:{
    placeholder: string,
    type: string
}){
    return <div>
        <input type={type}
         placeholder={placeholder}
         className="p-4 m-2 border border-gray-200 rounded-md" ></input>
    </div>
}