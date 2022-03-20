import { selector } from 'recoil'
import { currentUserState } from './atoms'

export const isAuthenticatedState = selector({
    key: 'isAuthenticated',
    get: ({get}) => {
        const currentUser = get(currentUserState)
        return !!currentUser
    }
})