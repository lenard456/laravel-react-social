import { useEffect } from 'react'
import { AuthApi } from '@apis'
import { useAuthState } from '@/js/states'
import { useApi } from '@/js/hooks'
import useAuthActions, { SET_AUTHENTICATED } from '@/js/recoil/actions/useAuthActions'

export default function()
{
    const { execute, isLoading, status, validationErrors, navigate, message } = useApi(AuthApi.login)
    const authDispatcher = useAuthActions()

    // On Status Changed
    useEffect(() => {
        if (status === 'success') {
            authDispatcher(SET_AUTHENTICATED)
            message.success('Login Successfully')
            navigate('/')
        }
    }, [status])

    const handleSubmit = (formData) => {
        if (isLoading) return;
        execute(formData)
    }

    return {
        handleSubmit,
        validationErrors,
        isLoading
    }
}