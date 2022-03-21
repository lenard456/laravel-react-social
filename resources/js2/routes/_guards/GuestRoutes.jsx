import { useRecoilValue } from 'recoil'
import { Navigate, Outlet } from 'react-router-dom'
import authState from '@/js/recoil2/authState'

export default function () 
{
    const { currentUser } = useRecoilValue(authState)

    const isAuthenticated = !!currentUser;

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />
}