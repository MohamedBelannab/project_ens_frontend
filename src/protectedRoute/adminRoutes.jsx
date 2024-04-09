import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function AdmindRoutes() {
    let { admin } = useSelector(state => state.login.user)
    return (
        !admin  ? <Navigate to='/' /> : <Outlet />
    )
}
