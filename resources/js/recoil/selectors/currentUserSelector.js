import { useMemo } from 'react'
import { selector, useRecoilValue } from "recoil";
import authState from "../states/authState";
import usersState from "../states/usersState";
import useUserFollowingIds from "./useUserFollowings";


const currentUserSelector = selector({
    key: 'v2.currentUser',
    get: ({get}) => {
        const { currentUserId } = get(authState)
        const users = get(usersState)
        return users[currentUserId]
    }
})

export const useCurrentUserFollowingIds = () => {
    const { currentUserId } = useRecoilValue(authState)
    const { 
        userFollowingIds:currentUserFollowingIds, 
        isUserFollowing:isCurrentUserFollowing
    } = useUserFollowingIds(currentUserId)

    return {
        currentUserFollowingIds,
        isCurrentUserFollowing
    }
}

export const useIsFollowedByCurrentUser = (userId) => {
    const { isCurrentUserFollowing, currentUserFollowingIds } = useCurrentUserFollowingIds()
    const isFollowedByCurrentUser = useMemo(() => isCurrentUserFollowing(userId), [currentUserFollowingIds])
    return isFollowedByCurrentUser
}

export default currentUserSelector