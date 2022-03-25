import { useEffect } from 'react'
import { AuthApi } from "@/js/apis";
import { useApi } from '@/js/hooks';

export default function()
{
    const { isLoading, execute, status, navigate, message, validationErrors } = useApi(AuthApi.register)

    useEffect(() => {
        if (status === 'success') {
            message.success('Account created successfully')
            navigate('/login')
        }
    }, [status])

    const register = (formData) => {
        if (isLoading) return;
        execute(formData)
    }

    return {
        register,
        isLoading,
        validationErrors
    }
}