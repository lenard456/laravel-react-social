import { useSetRecoilState } from 'recoil'
import { authState } from '@/js/recoil/states'
import { Cache } from '@/js/utils'
import User from '@/js/api/User'

export default function useAuthAction()
{

    const setCurrentUser = useSetRecoilState(authState)

    return {
        login: async function(formData) {
            const { data } = await User.login(formData)
            setCurrentUser({
                currentUser: data, 
                isValidated: true
            })
            Cache.set('auth', data)
            Cache.set('auth_validated', true, 2*60*60*1000) //Revalidate every 2 hrs
        }
    }
}