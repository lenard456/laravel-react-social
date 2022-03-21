import { useSetRecoilState } from 'recoil'
import postState, { feedState } from '@/js/recoil/states/postState'
import { useAuthState } from '@/js/recoil/states/authState'

const convertToObject = (posts) => {
    let object = {}
    posts.forEach(post => {
        object[post.id] = post
    })
    return object
}

export default function usePostSetter()
{
    const { currentUser } = useAuthState()
    const setPostState = useSetRecoilState(postState)
    const setFeedState = useSetRecoilState(feedState)

    return {
        appendPost(post) {
            setPostState(posts => {
                let postObject = convertToObject([post])
                return {...posts, ...postObject}
            })
            setFeedState(feedIds => {
                return [post.id, ...feedIds]
            })
        },

        setPosts(posts) {
            setPostState(_posts => {
                let postsObject = convertToObject(posts)
                return {...posts, ...postsObject}
            })
            setFeedState(feeds => {
                return [...feeds, ...(posts.map(post => post.id))]
            })
        }
    }
}