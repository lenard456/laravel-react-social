import { useSetRecoilState } from "recoil"
import usersState from "../states/usersState"
import _ from 'lodash'
import useFollowingIdsAction from "./useFollowingIdsAction"

const useUsersAction = () => {
    const setUsersState = useSetRecoilState(usersState)
    const { setFollowingIds } = useFollowingIdsAction()

    const setUsers = (newUsers) => {
        newUsers.forEach(user => {
            if (user.followingIds) {
                setFollowingIds(user.id, user.followingIds)
            }
        });
        
        //Exclude some data
        const transformToObject = _.keyBy(newUsers.map(({followingIds, ...user})=>user), 'id')
        setUsersState(users => ({
            ...users, 
            ...transformToObject
        }))        
    }

    const setUser = (user) => setUsers([user])

    return {
        setUsers,
        setUser
    }

}

export default useUsersAction