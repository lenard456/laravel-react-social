import { useRecoilValue } from "recoil"
import postsState from "../states/postsState"


const usePost = (postId) => {
    const posts = useRecoilValue(postsState)
    return posts[postId]
}

export default usePost