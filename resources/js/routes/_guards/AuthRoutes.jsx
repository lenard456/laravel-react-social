import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '@/js/recoil/states/authState'

export default function () 
{
    const { isAuthenticated, isValidated } = useAuthState()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (!isValidated) {        
        return <div>Validating</div>
    }

    return <Outlet />
}