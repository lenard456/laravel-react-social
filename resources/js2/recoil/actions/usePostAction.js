import * as Post from '@/js/api/Post'
import { usePostSetter } from '@/js/recoil/setters'

export default function usePostAction() {

    const { appendPost, setPosts } = usePostSetter()

    return {
        createPost: async function(content) {
            const { data } = await Post.createPost(content)
            appendPost(data)
        },

        fetchPosts: async function() {
            const { data:posts } = await Post.fetchPosts()
            setPosts(posts)
        }
    }
}