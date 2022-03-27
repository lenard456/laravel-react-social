import { useSetRecoilState } from "recoil"
import usersPostIdsState from "../states/usersPostIdsState"
import usePostsAction, { SET_POSTS } from "./usePostsAction"

const useUsersPostIdsAction = () => {

    const setUsersPostIds = useSetRecoilState(usersPostIdsState)
    const postsDispatcher = usePostsAction()

    const setUserPostIds = (userId, {currentPage, lastPage, posts}) => {
        postsDispatcher(SET_POSTS, {posts})
        setUsersPostIds(usersPostIds => {
            const {postIds} = usersPostIds[userId] || {postIds:[]}
            return {
                ...usersPostIds,
                [userId]: {
                    currentPage,
                    lastPage,
                    postIds: [...postIds, ...posts.map(post => post.id)]
                }
            }
        })
    }

    return {
        setUserPostIds
    }
}

export default useUsersPostIdsAction