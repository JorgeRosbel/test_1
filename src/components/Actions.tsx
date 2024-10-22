import { useBigData } from "@api/useStore";

interface Action {
    handleColor: () => void;
    handleReset: () => void;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const Actions: React.FC<Action> = ({ handleColor, handleInput, handleReset }) => {
    const { filterBy, inputValue } = useBigData();

    return (
        <>
            <h1 className="text-center mt-4 mb-4 text-[3.2em] text-white font-bold">Prueba Técnica</h1>
            <div className="flex gap-3 items-center justify-between">
                <button
                    onClick={handleColor}
                    className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Colorear filas</button>
                <button
                    onClick={() => filterBy("country")}
                    className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Ordenar por país</button>
                <button
                    onClick={handleReset}
                    className="text-white bg-black py-2 px-4 rounded-lg font-semibold border-solid border-[2px] border-black transition-all duration-200 hover:border-[#646cff]">Resetear resultado</button>
                <input
                    onChange={handleInput}
                    value={inputValue}
                    type="text"
                    placeholder="Filtrar por país"
                    className="outline-none text-[14px] px-[2px] border-solid border-[1px] border-white bg-[#4e4d4d] rounded-sm border-opacity-35 
                transition-all duration-200 hover:border-opacity-60 focus:border-opacity-100 text-white"></input>
            </div>
        </>

    )
}