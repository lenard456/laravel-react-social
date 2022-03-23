import { useState, useEffect } from 'react'

const STATUS_IDLE = 'idle'
const STATUS_LOADING = 'loading'
const STATUS_ERROR = 'error'
const STATUS_SUCCESS = 'success'

const defaultConfig = {
    params: [],
    executeOnMount: false
}

const useFetch = function(promise, config) {
    const { params, executeOnMount } = {...defaultConfig, ...config}
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)   
    const [status, setStatus] = useState(STATUS_IDLE)
    const isLoading = status === STATUS_LOADING
    const isError = status === STATUS_ERROR
    const isSuccess = status === STATUS_SUCCESS
    
    const execute = async(...params) => {
        try {
            setStatus(STATUS_LOADING)
            const response = await promise(...params)
            setData(response.data)
            setStatus(STATUS_SUCCESS)
        } catch (error) {
            setError(error)
            setStatus(STATUS_ERROR)
        }
    }

    //On Mount
    useEffect(() => {
        if (executeOnMount) {
            execute(...params)
        }
    }, [])

    return {
        execute, data, error, isLoading, isError, isSuccess, status
    }

}

export default useFetch