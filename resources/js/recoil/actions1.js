import { useSetRecoilState } from 'recoil'

import { currentUserState } from './atoms'
import User from '@/js/api/User'

export const useAuthAction = function() {
    const setCurrentUser = useSetRecoilState(currentUserState)

    return {
        login: async(formData) => {
            const {data:user} = await User.login(formData)
            localStorage.setItem('currentUser', JSON.stringify(user))
            setCurrentUser(user)
        },

        logout: () => {
            localStorage.removeItem('currentUser')
            setCurrentUser(null)
        }
    }
}