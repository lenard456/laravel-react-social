import { useEffect } from 'react'
import { Spin } from 'antd'
import { Logo } from '@components'
import { useApi } from '@/js/hooks'
import { AuthApi } from '@/js/apis'
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import authState from '@/js/recoil/states/authState'
import useAuthActions, { SET_CURRENT_USER } from '@/js/recoil/actions/useAuthActions'

const Validating = () => {
    return (
        <div className='h-screen flex flex-col justify-center'>
            <Spin />
            <Logo />
        </div>
    )
}


// const AuthenticatedUserOnly = () => {
//     const { isLoading, execute, status, data:user } = useApi(AuthApi.fetchCurrentUser)
//     const { isAuthenticated, isValidated, dispatch } = useAuthState()

//     useEffect(() => {
//         if (status == 'success') {
//             dispatch('SET_USER', user)
//         }
//     }, [status])

//     useEffect(() => {
//         if (isAuthenticated && !isValidated) {
//             execute()
//         }
//     }, [])

//     if (isLoading) {
//         return <Validating />
//     }
    
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />
//     }

//     if (isValidated) {
//         return <Outlet />
//     }

//     return null
// }

const AuthenticatedUserOnly = () => {
    const { isLoading, execute, status, data:user } = useApi(AuthApi.fetchCurrentUser)
    const { isAuthenticated, currentUserId  } = useRecoilValue(authState)
    const authDispatcher = useAuthActions()
    const isValidated = currentUserId !== null

    useEffect(() => {
        if (status == 'success') {
            authDispatcher(SET_CURRENT_USER, {user})
        }
    }, [status])

    useEffect(() => {
        if (isAuthenticated && !isValidated) {
            execute()
        }
    }, [])

    if (isLoading) {
        return <Validating />
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    if (isValidated) {
        return <Outlet />
    }

    return null
}

export default AuthenticatedUserOnly