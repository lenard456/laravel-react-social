import Cache from 'js-cache'
import { useSetRecoilState } from 'recoil'
import User from '@/js/api/User'
import { authState } from '@/js/recoil/states'

export default function useAuthAction()
{

    const setCurrentUser = useSetRecoilState(authState)

    return {
        login: async function(formData) {
            const { data } = await User.login(formData)
            setCurrentUser(data)
            Cache.set('auth', data)
            Cache.set('auth_validated', true, 2*60*60*1000) //Revalidate every 2 hrs
        }
    }
}