import { createContext, Dispatch, useContext } from "react";
import { ChildTypes } from "../pages/AuthLayout";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ContextType{
    state:StateType,
    dispatch: Dispatch<ActionType>
}

const userContext = createContext({} as ContextType)

export interface StateType{
    login:{isLogin:boolean,name:string},
}

export interface ActionType{
    type:string,
    payload:string
}

const reducer = (state:StateType,action:ActionType) : StateType => {
    if(action.type === "LOGIN"){
        return {...state,login:{isLogin:true,name:action.payload}}
    }
    else if(action.type === 'LOGOUT'){
        return {...state,login:{isLogin:false,name:""}}
    }
    return state
}

const defaultState: StateType = {
    login:{
        isLogin:false,
        name:""
    }
}


export function UserContextProvider({children}:ChildTypes){
    const [state,dispatch] = useLocalStorage('user',reducer,defaultState)
    return <userContext.Provider value={{state,dispatch}}>
        {children}
    </userContext.Provider>
}

export function useAuth(){
    return useContext(userContext)
}