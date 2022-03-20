import { useEffect } from 'react'
import { usePostState } from '@/js/recoil/states/postState'
import { usePostAction } from '@/js/recoil/actions'
import CreatePost from './components/CreatePost'
import Post from './components/Post'

export default function() {

    const { feeds, posts, feedsIds } = usePostState()
    const { fetchPosts } = usePostAction()

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        console.log({feeds, posts, feedsIds})
    }, [feeds, posts, feedsIds])

    return (
        <div className='max-w-4xl mx-auto mt-8 grid grid-cols-5 gap-8'>

            <div className='col-span-3'>
                
                <div className='space-y-4'>
                    <CreatePost />

                    {feeds.map(post => <Post key={post.id} post={post}/>)}

                </div>

            </div>

            <div className='col-span-2'>
                
                <div className='bg-white rounded-lg border border-solid p-4 border-gray-300'>
                    <div className='flex justify-between'>
                        <span className='font-bold'>Suggested Friends</span>
                        <a href='#'>See all</a>
                    </div>
                </div>

            </div>

        </div>
    ) 
}