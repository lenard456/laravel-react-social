import { useCallback } from 'react'
import { useRecoilValue } from "recoil"
import followingIdsState from "../states/followingIdsState"

const useUserFollowingIds = (userId) => {
    const followingIds = useRecoilValue(followingIdsState)
    const userFollowingIds = followingIds[userId] || []
    const userFollowingCount = userFollowingIds.length

    const isUserFollowing = (otherUserId) => {
        return userFollowingIds.some(id => id == otherUserId)
    }

    return {
        userFollowingIds,
        userFollowingCount,
        isUserFollowing
    }
}

export default useUserFollowingIds