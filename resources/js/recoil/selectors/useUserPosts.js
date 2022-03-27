import { useRecoilValue } from "recoil"
import postsState from "../states/postsState"
import usersPostIdsState from "../states/usersPostIdsState"

const useUserPosts = function(userId) {
    const usersPostIds = useRecoilValue(usersPostIdsState)
    const posts = useRecoilValue(postsState)
    const {currentPage, lastPage, postIds} = usersPostIds[userId] || {currentPage: 0, lastPage: null, postIds: []}
    const userPosts = postIds.map(id => posts[id])
    return { currentPage, lastPage, posts:userPosts}
}

export default useUserPosts;