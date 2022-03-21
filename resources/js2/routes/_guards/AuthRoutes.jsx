import { Spin, message } from 'antd'
import { useState, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Logo } from '@/js/components'
import authState from '@/js/recoil2/authState'
import * as User from '@/js/api/User'
import { useErrorHandler2, Cache } from '@/js/utils'

const Validating = () => {
    return (
        <div className='h-screen flex flex-col justify-center'>
            <Spin />
            <Logo />
        </div>
    )
}

export default function()
{
    const [isError, setIsError] = useState(false)
    const { currentUser, isValidated } = useRecoilValue(authState)
    const [isValidating, setIsValidating] = useState(!isValidated)
    const isAuthenticated = !!currentUser;
    const setAuthState = useSetRecoilState(authState)

    const navigate = useNavigate()
    const { handleError, unAuthenticatedHandler, defaultHandler } = useErrorHandler2()

    useEffect(() => {

        if (!isAuthenticated || isValidated) return

        //Async Wrapper :))
        ;(async() => {
            setIsValidating(true)

            try {
                const {data:user} = await User.getCurrentUser()
                setAuthState({currentUser: user, isValidated: true})
                Cache.set('auth.currentUser', user)
                Cache.set('auth.isValidated', true, 2*60*60*1000)
                setIsValidating(false)
            } catch (error) {
                handleError(error)
                    .catch(unAuthenticatedHandler)
                    .catch(defaultHandler)
                    .catch(error => {
                        setIsError(true)                        
                        setIsValidating(false)
                    })
            }
        })();
    }, [])


    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (isValidating) {
        return <Validating />
    }

    return <Outlet/>

}