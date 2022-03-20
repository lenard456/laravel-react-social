import { atom, useRecoilValue } from 'recoil'
import Cache from 'js-cache'

window.Cache = Cache

export default authState = atom({
    key: 'auth',
    default: {
        currentUser: Cache.get('auth'),
        isValidated: !!Cache.get('auth_validated')
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