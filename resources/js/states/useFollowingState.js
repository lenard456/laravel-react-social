import { atom, useRecoilState, useSetRecoilState } from "recoil";

const followingIdsState = atom({
    key: 'followingIds',
    default: {}
})

export default function() {
    const [followingIds, setFollowingIds] = useRecoilState(followingIdsState)

    const updateFollowingIds = (user_id, followingIds) => {
        setFollowingIds(oldState => {
            return {
                ...oldState,
                [user_id] : followingIds
            }
        })
    }

    return {
        setFollowingIds,
        updateFollowingIds,
        followingIds
    }
}