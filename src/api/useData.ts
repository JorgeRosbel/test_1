import { useState } from "react";
import { type Data } from "./useFetch";
import { useCallback } from "react";
import Fuse from "fuse.js";


export type Mode = "country" | "first" | "last" | "normal"


export const useData = () => {

    const [filterData,setFilterData] = useState<Data[]>([]);

    const update = useCallback((data:Data[] )=> { setFilterData(data) },[])

    const filterByContry = useCallback((country: string) => {
       
        const options = {
            keys: ['location.country'],
            threshold: 0.3,
            location: 0,
            distance: 100,
            includeMatches: true,
            includeScore: true,
            useExtendedSearch: true
        }
        const fuse = new Fuse(filterData, options)
        const result = fuse.search(country);
        const newData = result.map(v => v.item)

        setFilterData(newData)
    }, [filterData])

    const Sort = useCallback((mode:Mode) => {
        const newData = mode === "country" ? [...filterData].sort((a,b)=> {
            if(a.location.country > b.location.country ){
                return 1
            }
            else if( a.location.country  < b.location.country ){
                return -1;
            }
            else{
                return 0;
            }
        })
        : mode === "first" ? [...filterData].sort((a,b)=> {
            if(a.name.first > b.name.first){
                return 1
            }
            else if( a.name.first  < b.name.first ){
                return -1;
            }
            else{
                return 0;
            }
        })
        : mode === "last" ? [...filterData].sort((a,b)=> {
            if(a.name.last > b.name.last ){
                return 1
            }
            else if( a.name.last  < b.name.last ){
                return -1;
            }
            else{
                return 0;
            }
        })
        : [...filterData]


        setFilterData(newData)
    },[filterData])


    const Delete = useCallback((username:string)=> {
        console.log(filterData);
        const newData = [...filterData].map( user => 
            user.name.first === username ? {...user, active: false}
            : user
        )
        setFilterData(newData);
    },[filterData])


    return {filterData, update , filterByContry, Sort, Delete}

}