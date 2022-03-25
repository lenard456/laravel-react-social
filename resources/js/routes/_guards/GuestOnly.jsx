import { isAuthenticatedState } from "@/js/states/useAuthStates"
import { useRecoilValue } from "recoil"
import { Navigate, Outlet } from 'react-router-dom'

const GuestOnly = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState)

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    
    return <Outlet />
}

export default GuestOnly