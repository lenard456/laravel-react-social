import { useRecoilValue } from "recoil"
import followingIdsState from "../states/followingIdsState"

const useUserFollowingIds = (userId) => {
    const followingIds = useRecoilValue(followingIdsState)
    const userFollowingIds = followingIds[userId] || []

    const isUserFollowing = (otherUserId) => {
        return userFollowingIds.some(id => id == otherUserId)
    }

    return {
        userFollowingIds,
        isUserFollowing
    }
}

export default useUserFollowingIds