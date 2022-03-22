import { useState, useEffect } from 'react'
import { AuthApi } from '@apis'
import validationRules from './validationRules'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { useFetch, mapValidationErrors } from '@/js/utils'

export default function()
{
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const { data:user, error, isLoading, execute, status } = useFetch(AuthApi.login)
    const [validationErrors, setValidationErrors] = useState({})
 
    // On Status Changed
    useEffect(() => {
        if (status === 'success') {
            setAuth(user)
            message.success('Login Successfully')
            navigate('/')
        } else if (status === 'error') {
            if (error?.response?.status === 422) {
                const { errors } = error.response.data
                setValidationErrors(mapValidationErrors(errors))
            } else {
                message.error('An unknown error occured');
            }
        }
    }, [status])

    const handleSubmit = (formData) => {
        if (isLoading) return;
        setValidationErrors({})
        execute(formData)
    }

    return {
        handleSubmit,
        validationErrors,
        isLoading
    }
}