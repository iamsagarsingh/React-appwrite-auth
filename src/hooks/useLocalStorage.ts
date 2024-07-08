import { useEffect, useReducer } from "react";
import { ActionType, StateType } from "../context/UserContext";

export function useLocalStorage(key:string,reducer:React.Reducer<StateType,ActionType>,defaultState:StateType){
    const [state,dispatch] = useReducer(reducer,defaultState,(initialState)=>{
        const jsonData = localStorage.getItem(key)
        if(jsonData !== null) return JSON.parse(jsonData)
        else return initialState
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state])

    return [state,dispatch] as const
}