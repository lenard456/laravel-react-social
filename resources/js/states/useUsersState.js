import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { deepMerge } from '@utils'
import useFollowingState, { followingIdsState, useUserFollowingIdState } from './useFollowingState'

export const usersState = atom({
    key: 'users',
    default: {}
})

const convertToObject = (users) => {
    return users.reduce((acm, user) => {
        return {...acm, [user.id]: user}
    }, {})
}

const reducer = (users, type, payload) =>{
    switch (type) {
        case 'ADD_OR_UPDATE_USERS': 
            let newUsers = payload
            return newUsers.reduce((acm, user) => {
                return {...acm, [user.id] : user}
            }, users)
        case 'ADD_OR_UPDATE_USER':
            let user = payload
            return reducer(users, 'ADD_OR_UPDATE_USERS', [user])
        default:
            return users;
    }
}

const useUsersState = function() {
    const [users, setUsers] = useRecoilState(usersState)
    const { dispatch:dispatchFollowingState } = useFollowingState()

    //sideEffect
    const extract = (type, payload) => {
        switch(type) {
            case 'ADD_OR_UPDATE_USERS':
            case 'USERS':
                const users = payload
                let extracted = []
                users.forEach(({followingIds,...user}) => {
                    if(followingIds) {
                        dispatchFollowingState('SET_FOLLOWING_IDS', {
                            userId: user.id, 
                            followingIds
                        });
                    }
                    extracted.push(user)
                })
                return extracted;
            case 'SET_USER':
            case 'ADD_OR_UPDATE_USER':
                const {followingIds, ...user} = payload
                if (followingIds) dispatchFollowingState('SET_FOLLOWING_IDS', {userId:user.id, followingIds})
                return user;
            default:
                return payload
        }
    }

    const dispatch = (type, payload) => {
        let extracted = extract(type, payload)
        setUsers((users) => reducer(users, type, extracted))
    }


    return {
        users,
        dispatch
    }
}

export const useUserState = function(userId)
{
    const users = useRecoilValue(usersState)
    const useThisUserFollowingIdState = () => useUserFollowingIdState(userId)

    const user = users[userId]

    return {
        id: userId,
        user,
        useUserFollowingIdState: useThisUserFollowingIdState
    }
} 

export default useUsersState;