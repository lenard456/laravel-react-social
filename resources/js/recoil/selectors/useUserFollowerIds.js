import { useRecoilValue } from "recoil"
import followerIdsState from "../states/followerIdsState"


const useUserFollowerIds = (userId) => {
    const followerIds = useRecoilValue(followerIdsState)
    return followerIds[userId] || []
}

export default useUserFollowerIds