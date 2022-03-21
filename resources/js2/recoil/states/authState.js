import { atom, useRecoilValue } from 'recoil'
import { Cache } from '@/js/utils'

window.Cache = Cache

const authState = atom({
    key: 'auth1',
    default: {
        currentUser: Cache.get('auth', null),
        isValidated: Cache.get('auth_validated', false)
    }
})

export function useAuthState() {

    const { currentUser, isValidated } = useRecoilValue(authState)

    return {
        currentUser,
        isAuthenticated: !!currentUser,
        isValidated
    }
}

export default authState