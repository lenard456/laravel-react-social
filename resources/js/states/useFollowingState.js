import { useMemo } from 'react'
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const followingIdsState = atom({
    key: 'followingIds',
    default: {}
})

const reducer = (allFollowingIds, type, payload) => {
    switch(type) {
        case 'SET_FOLLOWING_IDS': {
            const { userId, followingIds } = payload
            return {...allFollowingIds, [userId]: followingIds}
        }
        case 'ADD_FOLLOWING_ID': {
            const { userId, followingId } = payload
            return {...allFollowingIds, [userId]: [...allFollowingIds[userId], followingId]}
        }
        default:
            return allFollowingIds
    }
}

const useFollowingState = function() {
    const [followingIds, setFollowingIds] = useRecoilState(followingIdsState)

    const dispatch = (type, payload) => {
        setFollowingIds((allFollowingIds) => reducer(allFollowingIds, type, payload))
    }

    return {
        followingIds,
        dispatch
    }
}

export const useUserFollowingIdState = (userId) => {
    const {followingIds:allFollowingIds, dispatch} = useFollowingState()
    //const [allFollowingIds, setAllFollowingIds] = useRecoilState(followingIdsState)
    const followingIds = allFollowingIds[userId] || []


    const isFollowing = (otherUserId) => {
        return followingIds.some(id => id == otherUserId)
    }

    return {
        followingIds,
        isFollowing,
        dispatch
    }
}

export default useFollowingState