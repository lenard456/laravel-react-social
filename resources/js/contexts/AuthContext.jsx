import { createContext, useContext, useState, useMemo } from 'react'
import { Cache } from '@utils'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(Cache.get('auth.user', null))
    const [isValidated, setIsValidated] = useState(Cache.get('auth.isValidated', false))
    const isAuthenticated = useMemo(() => !!currentUser, [currentUser])

    const setAuth = (user) => {
        setCurrentUser(Cache.set('auth.user',user))
        setIsValidated(Cache.set('auth.isValidated', true, 2*60*60*1000)) //Revalidated after 2hrs
    }

    const invalidateSession = () => {
        setCurrentUser(Cache.remove('auth.user', null))
        setIsValidated(Cache.remove('auth.isValidated', false))
    }

    const value = {currentUser, isValidated, setAuth, invalidateSession, isAuthenticated }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext