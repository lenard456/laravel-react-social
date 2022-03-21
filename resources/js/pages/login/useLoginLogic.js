import { useState } from 'react'
import validationRules from './validationRules'
import { useAuthApi } from '@apis'

export default () => {
    const { login } = useAuthApi(false)
    const validationErrors = {}
    const [isLoading, setIsLoading] = useState(false)
    const isSuccess=false

    const handleSubmit = async (formData) => {
        setIsLoading(true)

        try{
            await login()
        } catch (error) {
            console.log(Error)
        }

        setIsLoading(false)
    }

    return {
        handleSubmit,
        rules: validationRules,
        validationErrors,
        isLoading,
        isSuccess
    }
}