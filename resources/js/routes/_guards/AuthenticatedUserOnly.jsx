import { useAuth } from '@contexts/AuthContext'
import { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import AuthApi from '@apis/AuthApi'
import { Spin, message } from 'antd'
import { Logo } from '@components'

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
    const {isAuthenticated, isValidated, invalidateSession } = useAuth()
    const { error, refetch, status, isLoading, ...query } = useQuery('currentUser', AuthApi.fetchCurrentUser, {
        enabled: false
    })

    useEffect(() => {
        if (isAuthenticated && !isValidated) {
            console.log({isAuthenticated, isValidated})
            refetch()
        }

        return () => {
            query.remove()
        }
    }, [])

    useEffect(() => {
        if (status == 'error') {
            if (error?.response?.status === 401) {
                message.error('Session expired you need to login again')
                invalidateSession()
                navigate('/login')
            }
        }
    }, [status, error])

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }    

    if (isLoading) {
        return <Validating />
    }

    if (isAuthenticated && isValidated)
        return <Outlet />
    
    return <div>error</div>
}