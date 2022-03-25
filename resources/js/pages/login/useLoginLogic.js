import { useEffect } from 'react'
import { AuthApi } from '@apis'
import { useAuthState } from '@/js/states'
import { useApi } from '@/js/hooks'

export default function()
{
    const { execute, isLoading, status, validationErrors, navigate, message } = useApi(AuthApi.login)

    const { dispatch } = useAuthState()

    // On Status Changed
    useEffect(() => {
        if (status === 'success') {
            dispatch('SET_AUTHENTICATED', true)
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