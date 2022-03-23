import { atom, useRecoilState } from 'recoil'
import { deepMerge } from '@utils'
import useFollowingState from './useFollowingState'

export const usersState = atom({
    key: 'users',
    default: {}
})

const useUsersState = function() {
    const [users, setUsers] = useRecoilState(usersState)
    const { updateFollowingIds } = useFollowingState()

    const updateUsers = (newUsers) => {
        let objectNewUsers = newUsers.reduce((acm, {followingIds, ...user}) => {
            if (followingIds) updateFollowingIds(user.id, followingIds);
            return {...acm, [user.id]: user}
        }, {})

        setUsers(users => {
            return deepMerge(users, objectNewUsers)
        })
    }

    const updateUser = (newUser) => updateUsers([newUser])

    return {
        users,
        updateUser, 
        updateUsers
    }
}

export const useUserState = function(userId)
{
    const { users } = useUsersState()
    const user = users[userId]

    return {
        user
    }
} 

export default useUsersState;