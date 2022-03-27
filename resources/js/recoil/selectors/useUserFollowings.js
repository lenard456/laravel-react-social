import { useRecoilValue } from "recoil"
import followingIdsState from "../states/followingIdsState"

const useUserFollowingIds = (userId) => {
    const followingIds = useRecoilValue(followingIdsState)
    return followingIds[userId] || []
}

export default useUserFollowingIds