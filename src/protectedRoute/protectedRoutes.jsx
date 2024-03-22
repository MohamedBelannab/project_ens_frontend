import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
export default function ProtectedRoutes(){
    let isLoged = useSelector(state=>state.login.isLoged)
    return(
        !isLoged ? <Navigate to='/'/> : <Outlet/>
        
    )
}