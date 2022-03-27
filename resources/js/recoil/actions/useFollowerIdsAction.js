import { useSetRecoilState } from "recoil"
import followerIdsState from "../states/followerIdsState"

const useFollowerIdsAction = () => {
    const setFollowerIdsState = useSetRecoilState(followerIdsState)

    const setFollowerIds = (userId, userFollowerIds) => {
        setFollowerIdsState(followerIds => {
            return {
                ...followerIds,
                [userId]: userFollowerIds
            }
        })
    }
    
    return { setFollowerIds }
}

export default useFollowerIdsAction