import { atom, useRecoilState } from 'recoil'
import { deepMerge } from '@utils'

export const usersState = atom({
    key: 'users',
    default: {}
})

export default function() {
    const [users, setUsers] = useRecoilState(usersState)

    const updateUsers = (newUsers) => {
        let objectNewUsers = newUsers.reduce((acm, user) => {
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