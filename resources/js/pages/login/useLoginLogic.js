import { useEffect } from 'react'
import { AuthApi } from '@apis'
import { useApi } from '@/js/hooks'
import useAuthActions from '@/js/recoil/actions/useAuthActions'

export default function()
{
    const { execute, isLoading, status, validationErrors, navigate, message } = useApi(AuthApi.login)
    const { setAuthenticated } = useAuthActions()

    // On Status Changed
    useEffect(() => {
        if (status === 'success') {
            setAuthenticated()
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