import { useFetch } from "@api/useFetch";
import { useBigData } from "@api/useStore";
import { useEffect } from "react";
import { Actions } from "./Actions";
import { THead } from "./THead";
import { TBody } from "./TBody";
import { useActions } from "@api/useActions";


export const Table:React.FC = () => {
    const {status,data,error} = useFetch(100);
    const {tempData,setOriginalData,setTempData} = useBigData();
    const { color,handleColor,handleInput,handleReset} = useActions();

    useEffect(()=>{
        if(status === "success" && data){
            setOriginalData(data);
            setTempData(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[status])

    
    return(
        <section id="--table-users" className="w-full max-w-[1000px] flex flex-col items-center justify-center gap-3">
            <Actions handleColor={handleColor} handleInput={handleInput} handleReset={handleReset} />
            <table className={`w-full ${color && "table-color"}`}>
                <THead />
                <TBody status={status} tempData={tempData} message={error?.message} />
            </table>
        </section>
    )
}



