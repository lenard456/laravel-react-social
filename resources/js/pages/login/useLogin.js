import { useState } from 'react'
import { errorHandler } from '@/js/utils'
import { useAuthAction } from '@/js/recoil/actions'

export default function useLogin()
{
    const { login } = useAuthAction()
    const [isLoading, setIsLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const handleSubmit = async(formData) => {
        if (isLoading) return

        try {
            setIsLoading(true)
            await login(formData)
        } catch (error) {

            setIsLoading(false)

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

            errorHandler(error)            
        }

    }

    return { isLoading, validationErrors, handleSubmit }
}