export function Input({placeholder, type, onChange}:{
    placeholder: string,
    type: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
}){
    return <div>
        <input onChange = {onChange} type={type}
         placeholder={placeholder}
         className="p-4 m-2 border border-gray-200 rounded-md" ></input>
    </div>
}