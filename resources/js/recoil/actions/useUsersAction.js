import { useSetRecoilState } from "recoil"
import usersState from "../states/usersState"
import _ from 'lodash'
import useFollowingIdsAction, { SET_FOLLOWING_IDS } from "./useFollowingIdsAction"

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

const useUsersAction = () => {
    const setUsersState = useSetRecoilState(usersState)
    const followingIdsDispatcher = useFollowingIdsAction()

    const dispatch = (type, payload) => {
        switch(type){

            case SET_USERS: {
                const { users:newUsers } = payload         
                
                newUsers.forEach(user => {
                    if (user.followingIds) {
                        followingIdsDispatcher(SET_FOLLOWING_IDS, {
                            userId: user.id,
                            followingIds: user.followingIds
                        })
                    }
                });
                
                //Exclude some data
                const transformToObject = _.keyBy(newUsers.map(({followingIds, ...user})=>user), 'id')
                setUsersState(users => ({
                    ...users, 
                    ...transformToObject
                }))
                break;
            }

            case SET_USER: {
                const { user } = payload
                dispatch(SET_USERS, {users: [user]})
                break;
            }
        }
    }

    return dispatch
}

export default useUsersAction