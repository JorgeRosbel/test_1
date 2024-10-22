import { useBigData } from "@api/useStore"
import { FaRegTrashAlt } from "react-icons/fa";

interface Mod{
    name:{first:string, last:string};
    location:{ country:string};
    picture: {thumbnail:string};
    id:number;
}

export const Row: React.FC<Mod> = ({ name, location, picture,id }) => {

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