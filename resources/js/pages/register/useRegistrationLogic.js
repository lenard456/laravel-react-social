import { useState, useEffect } from 'react'
import { AuthApi } from "@/js/apis";
import { useFetch, mapValidationErrors } from "@/js/utils";
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function()
{
    const navigate = useNavigate()
    const [validationErrors, setValidationErrors] = useState({})
    const { isLoading, execute, status, error } = useFetch(AuthApi.register)

    useEffect(() => {
        if (status === 'success') {
            message.success('Account created successfully')
            navigate('/login')
        } else if (status === 'error') {
            if (error?.response?.status === 422) {
                const { errors } = error.response.data
                setValidationErrors(mapValidationErrors(errors))
            } else {
                message.error('An unknown error occured')
            }
        }
    }, [status])

    const register = (formData) => {
        if (isLoading) return;
        setValidationErrors({})
        execute(formData)
    }

    return {
        register,
        isLoading,
        validationErrors
    }
}