import { useSetRecoilState } from "recoil"
import usersState from "../states/usersState"
import _ from 'lodash'
import useFollowingIdsAction from "./useFollowingIdsAction"

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

const useUsersAction = () => {
    const setUsersState = useSetRecoilState(usersState)
    const { setFollowingIds } = useFollowingIdsAction()

    const dispatch = (type, payload) => {
        switch(type){

            case SET_USERS: {
                const { users:newUsers } = payload         
                
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