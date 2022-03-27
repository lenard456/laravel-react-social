import { useSetRecoilState } from "recoil"
import feedState from "../states/feedState"
import { union, map } from 'lodash'
import usePostsAction from "./usePostsAction"

const useFeedAction = () => {
    
    const setFeedState = useSetRecoilState(feedState)
    const { setPosts, setPost } = usePostsAction()

    const resetFeed = () => {
        setFeedState({
            currentPage: 0,
            lastPage: null,
            postIds: []
        })
    }

    const setFeed = ({posts, currentPage, lastPage}) => {
        setPosts(posts)
        setFeedState(({postIds}) => ({
            currentPage,
            lastPage,
            postIds: union(postIds, map(posts, 'id'))
        }))
    }

    const prependPost = (post) => {
        setPost(post)
        setFeedState(({postIds, ...feed}) => {
            return {
                ...feed,
                postIds: [post.id, ...postIds]
            }
        })
    }

    return {
        resetFeed,
        setFeed,
        prependPost
    }

}

export default useFeedAction