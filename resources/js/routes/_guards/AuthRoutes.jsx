import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '@/js/states/authState'

export default function () 
{
    const { isAuthenticated } = useAuthState()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}