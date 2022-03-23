import { createContext, useContext, useState, useMemo } from 'react'
import { Cache } from '@utils'
import useUsersState from '@/js/states/useUsersState'
import useFollowingState from '../states/useFollowingState'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const { updateUser } = useUsersState()
    const { followingIds } = useFollowingState()
    const [currentUser, setCurrentUser] = useState(Cache.get('auth.user', null))
    const [isValidated, setIsValidated] = useState(false)
    const isAuthenticated = !!currentUser
    const currentUserFollowing = isAuthenticated ? followingIds[currentUser.id] : []

    const isFollowing = (user_id) => {
        return currentUserFollowing && currentUserFollowing.some(id => id == user_id)
    }

    const setAuth = (user) => {
        updateUser(user)
        setCurrentUser(Cache.set('auth.user', user))
        setIsValidated(Cache.set('auth.isValidated', true, 2 * 60 * 60 * 1000)) //Revalidated after 2hrs
    }

    const invalidateSession = () => {
        setCurrentUser(Cache.remove('auth.user', null))
        setIsValidated(Cache.remove('auth.isValidated', false))
    }

    const value = {
        isFollowing,
        currentUser,
        isValidated, 
        setAuth, 
        invalidateSession, 
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext