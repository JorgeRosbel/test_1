import { useBigData } from "./useStore";
import { useState, useCallback } from "react";

export const useActions = () => {
    const {tempData,originalData,setInputValue,setTempData,search} = useBigData();
    const [color,setColor] = useState<boolean>(false);

    const handleColor = useCallback(() => setColor(c => !c), []);

    const handleInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        search(value)

        if(value === ""){
            const newData = tempData.map(v => ( {...v, visible:true }))
            setTempData(newData);
        }
    },[search, setInputValue, setTempData, tempData])

    const handleReset = useCallback(() => {
        setTempData(originalData); 
    },[originalData, setTempData])

    return {
        color,handleColor,handleInput,handleReset
    }
}