import { useSetRecoilState } from "recoil";
import followingIdsState from "../states/followingIdsState";

export const SET_FOLLOWING_IDS = 'SET_FOLLOWING_IDS'
export const APPEND_FOLLOWING_IDS = 'APPEND_FOLLOWING_IDS'

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

            case APPEND_FOLLOWING_IDS: {
                const { userId, followingId } = payload
                setFollowingIds(followingIds => {
                    const userFollowingIds = followingIds[userId]
                    return {...followingIds, [userId]: [...userFollowingIds, followingId]}
                })
                break;
            }
        }
    }

    return dispatch

}

export default useFollowingIdsAction