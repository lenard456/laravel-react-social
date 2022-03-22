import { useAuth } from "@contexts/AuthContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export default () => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    
    return <Outlet />
}