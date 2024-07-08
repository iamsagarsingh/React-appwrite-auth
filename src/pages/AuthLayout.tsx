import { ReactNode, useEffect } from "react"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export interface ChildTypes{
    children: ReactNode,
    authentication?:boolean
}
export function AuthLayout({children,authentication}:ChildTypes){
    const {state} = useAuth()
    const navigate = useNavigate()
    const {login} = {...state}

    useEffect(()=>{
        if(authentication && login.isLogin) navigate('/')
        else if(!login.isLogin) navigate('/login')
    },[login,authentication])
    return <>{children}</>
}