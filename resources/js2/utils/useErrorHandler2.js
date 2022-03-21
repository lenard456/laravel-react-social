import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import authState from '@/js/recoil2/authState'

export default function useErrorHandler2()
{
    const setAuthState = useSetRecoilState(authState)
    const navigate = useNavigate()

    const unAuthenticatedHandler = function(error) {
        if (error?.response?.status !== 401) throw error
        message.error('Session expired: You need to login again.')
        setAuthState({currentUser:null, isValidated: false})
        Cache.clear('auth.currentUser')
        Cache.clear('auth.isValidated')
        navigate('/login')
    } 

    const defaultHandler = function(error) {
        message.error('An unknown error occurred')
        throw error
    }

    const handleError = async function(error) {
        throw error
    }

    return {
        handleError,
        defaultHandler,
        unAuthenticatedHandler
    }
}