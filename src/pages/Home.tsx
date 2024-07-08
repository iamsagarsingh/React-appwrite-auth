import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/UserContext";

export function Home(){
    const {state} = useAuth()
    return <>
        <Navbar />
        <p>Home Page</p>
        <p>Welcome <span>{state.login.name}</span></p>
    </>
}