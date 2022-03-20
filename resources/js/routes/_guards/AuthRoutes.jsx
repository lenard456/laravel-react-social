import { Spin } from 'antd'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '@/js/recoil/states/authState'
import { useAuthAction } from '@/js/recoil/actions'
import { useErrorHandler } from '@/js/utils'
import { Logo } from '@/js/components'

const Validating = () => {
    return (
        <div className='h-screen flex flex-col justify-center'>
            <Spin />
            <Logo />
        </div>
    )
}

export default function () 
{
    const { isAuthenticated, isValidated } = useAuthState()
    const { revalidate }  = useAuthAction()
    const errorHandler = useErrorHandler()

    useEffect(() => {
        if (!isValidated) {
            revalidate().catch(errorHandler)
        }
    }, [isValidated])

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (!isValidated) { 
        return <Validating />
    }

    return <Outlet />
}