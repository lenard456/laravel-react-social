import { useSetRecoilState } from "recoil"
import postsState from "../states/postsState"
import _ from 'lodash'
import useUsersAction, { SET_USERS } from "./useUsersAction"
import usePostsCommentIdsAction, { SET_POST_COMMENT_IDS } from "./usePostsCommentIdsAction"

export const SET_POST = 'SET_POST'

const usePostsAction = () => {
    
    const setPostsState = useSetRecoilState(postsState)
    const usersDispatcher = useUsersAction()
    const postsCommentIdsDispatcher = usePostsCommentIdsAction()

    const setPosts = (newPosts) => {
        const users = _.compact(_.map(newPosts,'user'))                
        usersDispatcher(SET_USERS, {users})

        newPosts.forEach(({id, comments}) => {
            if(comments) postsCommentIdsDispatcher(SET_POST_COMMENT_IDS, {postId: id, comments})
        });

        const newPostsObject = _.keyBy(newPosts.map(({user, comments, ...post})=>post), 'id')

        setPostsState(posts => {
            return {...posts, ...newPostsObject}
        })
    }

    const setPost = (post) => setPosts([post])

    const setPostLikerIds = (postId, likerIds) => {
        setPostsState(posts => {
            const post = posts[postId]
            return {...posts, [postId]: {...post, likerIds} }
        })
    }

    return {
        setPost,
        setPosts,
        setPostLikerIds
    }

}

export default usePostsAction