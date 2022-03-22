import { atom, useSetRecoilState } from 'recoil'
import _ from 'lodash'

export const postsState = atom({
    key: 'posts',
    default: {}
})
/**
 * {
 *    "1": {post},
 *    "2": {post}
 * }
 * 
 * [{post}, {post}, {post}]
 * 
 */
const merge = (obj1, obj2) => {
    let obj1Clone = _.cloneDeep(obj1) //To prevent mutation
    return _.merge(obj1Clone, obj2)
}


const usePostsState = function() {
    const setPosts = useSetRecoilState(postsState)

    const updatePosts = (newPosts) => {
        let objectNewPosts = newPosts.reduce((acm, post) => {
            return {...acm, [post.id]: {...post, isLike: post.isLike || false}}
        }, {})

        setPosts(posts => {
            return merge(posts, objectNewPosts)
        })
    }

    const updatePost = (post) => {
        console.log(post)
        updatePosts([post])
    }

    return {
        updatePost,
        updatePosts
    }
}

export default usePostsState
