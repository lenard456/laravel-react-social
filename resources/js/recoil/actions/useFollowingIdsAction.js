import { useSetRecoilState } from "recoil";
import followingIdsState from "../states/followingIdsState";

const useFollowingIdsAction = () => {

    const setFollowingIdsState = useSetRecoilState(followingIdsState)

    const setFollowingIds = (userId, followingIds) => {
        setFollowingIdsState(oldValue => {
            return {...oldValue, [userId]: followingIds}
        })
    }

    const appendFollowingId = (userId, followingId) => {
        setFollowingIdsState(followingIds => {
            const userFollowingIds = followingIds[userId]
            return {...followingIds, [userId]: [...userFollowingIds, followingId]}
        })        
    }

    const removeFollowingId = (userId, followingId) => {
        setFollowingIdsState(followingIds => {
            const userFollowingIds = followingIds[userId].filter(id => id != followingId)
            return {...followingIds, [userId]: userFollowingIds}
        })
    }

    return {
        setFollowingIds,
        appendFollowingId,
        removeFollowingId
    }

}

export default useFollowingIdsAction