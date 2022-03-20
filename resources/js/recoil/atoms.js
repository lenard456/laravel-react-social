import { atom } from 'recoil'

export const currentUserState = atom({
    key: 'currentUser',
    default: JSON.parse(localStorage.getItem('currentUser'))
})

export const authState = atom({
    key: 'auth',
    default: {
        isAuthentication: false,
        validated: false,
        currentUser: null
    }
})