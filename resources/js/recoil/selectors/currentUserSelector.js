import { useMemo } from 'react'
import { selector, useRecoilValue } from "recoil";
import authState from "../states/authState";
import followerIdsState from '../states/followerIdsState';
import followingIdsState from '../states/followingIdsState';
import usersState from "../states/usersState";


const currentUserSelector = selector({
    key: 'currentUser',
    get: ({get}) => {
        const { currentUserId } = get(authState)
        const users = get(usersState)
        return users[currentUserId]
    }
})

export const currentUserFollowingIdsSelector = selector({
    key: 'currentUserFollowingIds',
    get: ({get}) => {
        const { currentUserId } = get(authState)
        const  followingIds = get(followingIdsState)
        return followingIds[currentUserId]
    }
})

export const currentUserFollowerIdsSelector = selector({
    key: 'currentUserFollowerIds',
    get: ({get}) => {
        const { currentUserId } = get(authState)
        const followerIds = get(followerIdsState)
        return followerIds[currentUserId]
    }
})

//Kung finollow ni current user
export const useIsFollowedByCurrentUser = (userId) => {
    const currentUserFollowingIds = useRecoilValue(currentUserFollowingIdsSelector)
    const isFollowedByCurrentUser = useMemo(() => currentUserFollowingIds.some(id => id == userId), [currentUserFollowingIds, userId])
    return isFollowedByCurrentUser
}

// Kung follower ng current user
export const useIsCurrentUserFollower = (userId) => {
    const currentUserFollowerIds = useRecoilValue(currentUserFollowerIdsSelector)
    const isCurrentUserFollower = useMemo(() => currentUserFollowerIds.some(id => id == userId), [currentUserFollowerIds, userId])
    return isCurrentUserFollower
}

export default currentUserSelector