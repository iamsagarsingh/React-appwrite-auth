import { authService } from "../appwrite/Auth"
import { useAuth } from "../context/UserContext"

export function Navbar(){
    const {dispatch} = useAuth()
    function handleLogout(){
        authService.Logout()
        dispatch({type:"LOGOUT",payload:""})
    }
    return <div className="p-4 bg-slate-200 text-right">
        <button className="bg-blue-200 p-2 rounded-md" onClick={handleLogout}>Logout</button>
    </div>
}