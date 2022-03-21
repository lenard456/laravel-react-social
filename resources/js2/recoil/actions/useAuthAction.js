import { useAuthSetter  } from '@/js/recoil/setters'
import { Cache, useErrorHandler } from '@/js/utils'
import * as User from '@/js/api/User'

export default function useAuthAction()
{
    const { setCurrentUser, removeCurrentUser } = useAuthSetter()

    return {
        login: async function(formData) {
            const { data } = await User.login(formData)
            setCurrentUser(data)
        },

        logout: async function() {
            await User.logout()
            removeCurrentUser()
        },

        revalidate: async function() {
            const { data } = await User.getCurrentUser()
            setCurrentUser(data)
        }
    }
}