import { useRecoilValue } from "recoil"
import { Navigate, Outlet } from 'react-router-dom'
import authState from "@/js/recoil/states/authState"

const GuestOnly = () => {
    const { isAuthenticated } = useRecoilValue(authState)

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    
    return <Outlet />
}

export default GuestOnly