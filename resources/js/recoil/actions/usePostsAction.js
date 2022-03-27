import { useSetRecoilState } from "recoil"
import postsState from "../states/postsState"
import _ from 'lodash'
import useUsersAction from "./useUsersAction"
import usePostsCommentIdsAction from "./usePostsCommentIdsAction"

export const SET_POST = 'SET_POST'

const usePostsAction = () => {
    
    const setPostsState = useSetRecoilState(postsState)
    const { setUsers } = useUsersAction()
    const { setPostCommentIds } = usePostsCommentIdsAction()

    const setPosts = (newPosts) => {
        const users = _.compact(_.map(newPosts,'user'))                
        setUsers(users)

        newPosts.forEach(({id, comments}) => {
            if(comments) setPostCommentIds(id, comments)
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