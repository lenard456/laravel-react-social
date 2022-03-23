import { atom, useRecoilState } from 'recoil'
import { deepMerge } from '@utils'
import useFollowingState from './useFollowingState'

export const usersState = atom({
    key: 'users',
    default: {}
})

export default function() {
    const [users, setUsers] = useRecoilState(usersState)
    const { updateFollowingIds } = useFollowingState()

    const updateUsers = (newUsers) => {
        let objectNewUsers = newUsers.reduce((acm, user) => {
            if (user.followingIds) updateFollowingIds(user.id, user.followingIds);
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