import { useAuth } from '@contexts/AuthContext'
import { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import AuthApi from '@apis/AuthApi'
import { Spin, message } from 'antd'
import { Logo } from '@components'
import { useFetch } from '@utils'

const Validating = () => {
    return (
        <div className='h-screen flex flex-col justify-center'>
            <Spin />
            <Logo />
        </div>
    )
}

export default function () {
    const navigate = useNavigate()
    const { isAuthenticated, isValidated, invalidateSession, setAuth } = useAuth()
    const { isLoading, error, data:user, execute, status } = useFetch(AuthApi.fetchCurrentUser)

    //OnMounted
    useEffect(() => {
        if (isAuthenticated && !isValidated) {
            execute() //This validate if the user is actually log in
        } 
    }, [])

    //Status Changed
    useEffect(() => {
        if (status === 'success') {
            setAuth(user)
        } else if (status === 'error') {
            if (error?.response?.status === 401) {
                message.error('Session expired: you need to login again.')
                invalidateSession()
                navigate('/login')
            } else {
                message.error('An unknown error occured');
            }
        }
    }, [status])    

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    if (isLoading) {
        return <Validating />
    }

    if (isAuthenticated && isValidated) {
        return <Outlet />
    }

    return null
}
