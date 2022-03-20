import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '@/js/recoil/states/authState'

export default function () 
{
    const { isAuthenticated } = useAuthState()

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />
}