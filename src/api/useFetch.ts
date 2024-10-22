import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export interface Data{
    name: { first: string, last:string };
    location: { country: string;}
    picture: {thumbnail: string};
    id: number;
    visible:boolean;
}

interface Results{
    results:Data[];
}

export const useFetch = (results:number) => {

    const endpoint = `https://randomuser.me/api/?results=${results}`;

    const queryFn = async():Promise<Data[]> => {

        try{
            const response = await axios.get<Results>(endpoint);
            const data = response.data.results.map( (user,index) => ({...user, id: index, visible:true}) )
            return data;
        }
        catch(error:unknown){

            if(error instanceof Error || axios.isAxiosError(error)){
                throw new Error("Error al obtener datos: " + error.message);
            }
            else{
                throw new Error("Error al obtener datos");
            }
        }
    };


    return useQuery({
        queryKey: ["data", results],
        queryFn: queryFn,
        staleTime: 1000 * 60 * 20,
        refetchOnWindowFocus: false
    })
}