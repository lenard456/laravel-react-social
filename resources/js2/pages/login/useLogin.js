import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import authState from '@/js/recoil2/authState'
import * as User from '@/js/api/User'
import { Cache, useErrorHandler2 } from '@/js/utils'

export default function() {

    const [isLoading, setIsLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const { handleError, defaultHandler } = useErrorHandler2()
    const setAuthState = useSetRecoilState(authState)

    const handleSubmit = async(formData) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const {data: user} = await User.login(formData)
            setAuthState({currentUser: user, isValidated: true})
            Cache.set('auth.currentUser', user)
            Cache.set('auth.isValidated', true, 2*60*60*1000)
        } catch (error) {
            handleError(error)
                .catch(error => {
                    if (error?.response?.status !== 422) throw error

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

                })
                .catch(defaultHandler)
        }
        setIsLoading(false)
    }

    return { isLoading, handleSubmit, validationErrors }
}
