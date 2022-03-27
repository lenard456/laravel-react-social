import { useSetRecoilState } from "recoil";
import followingIdsState from "../states/followingIdsState";

export const SET_FOLLOWING_IDS = 'SET_FOLLOWING_IDS'
export const APPEND_FOLLOWING_ID = 'APPEND_FOLLOWING_ID'
export const REMOVE_FOLLOWING_ID = 'REMOVE_FOLLOWING_ID'

const useFollowingIdsAction = () => {

    const setFollowingIds = useSetRecoilState(followingIdsState)

    const dispatch = (type, payload) => {
        switch (type) {
            case SET_FOLLOWING_IDS: {
                const {userId, followingIds:newFollowingIds} = payload
                setFollowingIds(followingIds => {
                    return {...followingIds, [userId]: newFollowingIds}
                })
                break;
            }

            case APPEND_FOLLOWING_ID: {
                const { userId, followingId } = payload
                setFollowingIds(followingIds => {
                    const userFollowingIds = followingIds[userId]
                    return {...followingIds, [userId]: [...userFollowingIds, followingId]}
                })
                break;
            }

            case REMOVE_FOLLOWING_ID: {
                const {userId, followingId} = payload
                setFollowingIds(followingIds => {
                    const userFollowingIds = followingIds[userId].filter(id => id != followingId)
                    return {...followingIds, [userId]: userFollowingIds}
                })
                break;
            }
        }
    }

    return dispatch

}

export default useFollowingIdsAction