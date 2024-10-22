import { useFetch } from "@api/useFetch";
import { FaRegTrashAlt } from "react-icons/fa";
import { useBigData } from "@api/useStore";
import { useEffect } from "react";
import { useState } from "react";


const FetchStatus: React.FC<{ text: string }> = ({ text }) => {

    return (
        <tr>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
        </tr>
    )
}

export const Table:React.FC = () => {
    const {status,data,error} = useFetch(100);
    const {tempData,originalData,inputValue,setInputValue,filterBy,setOriginalData,setTempData,search} = useBigData();
    const [color,setColor] = useState<boolean>(false);

    const handleColor = () => setColor(!color);

    useEffect(()=>{
        if(status === "success" && data){
            setOriginalData(data);
            setTempData(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[status])

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        search(value)

        if(value === ""){
            const newData = tempData.map(v => ( {...v, visible:true }))
            setTempData(newData);
        }
    }

    const handleReset = () => {
        setTempData(originalData); 
    }


    return(
        <section id="--table-users" className="w-full max-w-[1000px] flex flex-col items-center justify-center gap-3">
            <h1 className="text-center mt-4 mb-4 text-[3.2em] text-white font-bold">Prueba Técnica</h1>
            <div className="flex gap-3 items-center justify-between">
                <button 
                onClick={handleColor}
                className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Colorear filas</button>
                <button 
                onClick={()=> filterBy("country")}
                className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Ordenar por país</button>
                <button 
                onClick={handleReset }
                className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Resetear resultado</button>
                <input
                onChange={handleInput}
                value={inputValue}
                type="text" 
                placeholder="Filtrar por país" 
                className="outline-none text-[14px] px-[2px] border-solid border-[1px] border-white bg-[#4e4d4d] rounded-sm border-opacity-35 
                transition-all duration-200 hover:border-opacity-60 focus:border-opacity-100 text-white"></input>
            </div>
            <table className={`w-full ${color && "table-color"}`}>
                <thead className="text-white">
                    <tr> 
                        <th>Foto</th>
                        <th className="cursor-pointer" onClick={()=> filterBy("first")}>Nombre</th>
                        <th className="cursor-pointer" onClick={()=> filterBy("last")}>Apellido</th>
                        <th className="cursor-pointer" onClick={()=> filterBy("country")}>País</th>
                        <th className="cursor-pointer">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status === "pending" ? <FetchStatus text="Loading..." />
                        : status === "error" ? <FetchStatus text={error.message} />
                        : tempData.map((user,index) => user.visible &&
                            <Row name={user.name}
                                location={user.location}
                                picture={user.picture}
                                key={index}
                                id={user.id}
                         />)
                    }
                </tbody>
            </table>
        </section>
    )
}

interface Mod{
    name:{first:string, last:string};
    location:{ country:string};
    picture: {thumbnail:string};
    id:number;
}

const Row: React.FC<Mod> = ({ name, location, picture,id }) => {

    const {deleteUser} = useBigData();

    return (
        <tr className="text-white h-[60px] border-b-[#646cff] border-b-[1px] border-solid border-opacity-25">

            <td  className="flex items-center justify-center">
                <img src={picture.thumbnail} alt={`image-${name.first}`} width="50" height="50" className="w-[50px] h-[50px] rounded-full border-solid border-[2px] border-[#646cff]" />
            </td>
            <td  className="text-center">{name.first}</td>
            <td  className="text-center">{name.last}</td>
            <td  className="text-center">{location.country}</td>
            <td  className="text-center">
                <button onClick={()=> deleteUser(id)}>
                    <FaRegTrashAlt className="text-[#646cff] text-[1.5rem] text-opacity-75 transition-all duration-200 hover:text-opacity-100" />
                </button>
            </td>

        </tr>
    )
}

