import { message } from 'antd'
import { useAuthSetter } from '@/js/recoil/setters'

export default function useErrorHandler()
{

    const { removeCurrentUser } = useAuthSetter()

    return function handler(error) 
    {
        //Unauthenticated
        if (error?.response?.status === 401) {
            removeCurrentUser()
            message.error('Session expired: You need to login again.')
            return
        }

        console.log(error)
        message.error('An unknown error occurred')
    }
}