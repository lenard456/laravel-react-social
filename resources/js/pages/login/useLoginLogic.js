import { useState, useEffect } from 'react'
import { AuthApi } from '@apis'
import validationRules from './validationRules'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'

export default () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const [validationErrors, setValidationErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (user) {
            setAuth(user)
            message.success('Login successfully')
            navigate('/')
        }
    }, [user])

    const handleValidationError = (error) => {
        if(error?.response?.status !== 422) throw error

        const { errors } = error.response.data

        Object.keys(errors).forEach(field => {
            errors[field] = {
                validateStatus: 'error',
                help: errors[field].join(',')
            }
        })

        setValidationErrors(errors)

        return {}
    }

    const handleSubmit = async (formData) => {
        setIsLoading(true)

        try{
            const {data} = await AuthApi.login(formData).catch(handleValidationError)
            if (data) {
                setUser(data)
            }
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }

    return {
        handleSubmit,
        rules: validationRules,
        validationErrors,
        isLoading
    }
}