import { useSetRecoilState } from 'recoil'
import { authState } from '@/js/recoil/states'

export default function useAuthSetter()
{
    const setAuthState = useSetRecoilState(authState)

    return {
        setCurrentUser(user) {
            setAuthState({
                currentUser: user,
                isValidated: true
            })

            Cache.set('auth', user)
            Cache.set('auth_validated', true, 2*60*60*1000) //Revalidate every 2 hrs
        },

        removeCurrentUser() {
            setAuthState({
                currentUser: null,
                isValidated: false
            })

            Cache.clear('auth')
            Cache.clear('auth_validated')
        }
    }
}