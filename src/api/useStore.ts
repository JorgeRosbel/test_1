import { create } from "zustand";
import { Data } from "./useFetch";
import Fuse from "fuse.js";

export type Mode = "country" | "first" | "last" | "normal"

interface State{
    originalData:Data[];
    tempData: Data[];
    inputValue:string;
    setOriginalData: (newOriginalData:Data[]) => void;
    setTempData: (newTempData:Data[]) => void;
    filterBy:(mode: Mode) => void;
    search:(country: string) => void;
    deleteUser:(id:number) => void;
    setInputValue:(newValue:string) => void;
}


export const useBigData = create<State>(set => ({
    originalData:[],
    tempData: [],
    inputValue: "",
    setOriginalData: newOriginalData=> set({originalData:  newOriginalData}),
    setTempData: newTempData => set({ tempData: newTempData}),
    filterBy: (mode) => {
        set( state => {
            const newData = mode === "country" ? state.tempData.sort((a,b)=> {
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
            : mode === "first" ? state.tempData.sort((a,b)=> {
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
            : mode === "last" ? state.tempData.sort((a,b)=> {
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
            : state.originalData
            return ({tempData: newData})
        })
    },
    search: (country) => {
        set( state => {
            const options = {
                keys: ['location.country'],
                threshold: 0.3,
                location: 0,
                distance: 100,
                includeMatches: true,
                includeScore: true,
                useExtendedSearch: true
            }
            const fuse = new Fuse(state.tempData, options)
            const result = fuse.search(country).map(v => v.item);
           
            const newData = state.tempData.map( item => {
                
                if(result.includes(item)){
                    return {...item, visible:true}
                }else{
                    return {...item, visible:false};
                }
            });

            return ({tempData:newData})
        })
    },
    deleteUser: (id) => {
        set(state => {
            const newData = state.tempData.filter( user => user.id !== id  )

            return ({tempData: newData});
        })
    },
    setInputValue:(newInputValue) => set({inputValue: newInputValue})



}))