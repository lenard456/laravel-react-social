import { useSetRecoilState } from "recoil"
import usersState from "../states/usersState"
import _ from 'lodash'
import useFollowingIdsAction from "./useFollowingIdsAction"
import useFollowerIdsAction from "./useFollowerIdsAction"

const useUsersAction = () => {
    const setUsersState = useSetRecoilState(usersState)
    const { setFollowingIds } = useFollowingIdsAction()
    const { setFollowerIds } = useFollowerIdsAction()

    const setUsers = (newUsers) => {
        newUsers.forEach(user => {
            if (user.followingIds) setFollowingIds(user.id, user.followingIds);
            if (user.followerIds) setFollowerIds(user.id, user.followerIds);
        });
        
        //Exclude some data
        const transformToObject = _.keyBy(newUsers.map(({followerIds, followingIds, ...user})=>user), 'id')
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