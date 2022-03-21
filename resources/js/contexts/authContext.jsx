import { createContext } from 'react'

const initialState = {
    currentUser: null,
    isValidated: false
}

const authContext = createContext(initialState)

export const AuthContextProvider = authContext.Provider