import { useState, useMemo } from 'react'
import { errorHandler } from '@/js/utils'
import * as User from '@/js/api/User'

export default function() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const handleError = (error) => {
        //No error No handler :))
        if (!error) return

        //Catch Validation Errors
        if (error?.response?.status === 422) {
            const errors = error.response.data.errors
            const _validationErrors = {}
            for (var field in errors) {
                _validationErrors[field] = {
                    validateStatus: 'error',
                    help: errors[field].join(',')
                }
            }
            setValidationErrors(_validationErrors)
            return
        }

        //Unknown Error
        errorHandler(error)
    }

    const register = async(userData) => {

        if (isLoading) return

        setValidationErrors({})
        setIsLoading(true)

        const [data, error] = await User.register(userData)

        setUser(data)
        handleError(error)

        setIsLoading(false)
    }

    return { user, isLoading, validationErrors, register }
}