import { atom, useRecoilState } from 'recoil'
import { Cache } from '@/js/utils'

const authState = atom({
    key: 'auth',
    default: {
        currentUser: Cache.get('auth.currentUser', null),
        isValidated: Cache.get('auth.isValidated', false)
    }
})


export default authState