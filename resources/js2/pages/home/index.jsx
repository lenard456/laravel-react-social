import { atom } from 'recoil'
import { useEffect, useState } from 'react'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import { fetchPosts } from '@/js/api/Post'


export default function() {

    const [ isFetching, setIsFetching] = useState(false)
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        ;(async() => {
            setIsFetching(true)
            const { data } = await fetchPosts()
            setPosts(data.data)
            setIsFetching(false)
        })()
    }, [])

    return (
        <div className='max-w-4xl mx-auto mt-8 grid grid-cols-5 gap-8'>

            <div className='col-span-3'>
                
                <div className='space-y-4'>
                    <CreatePost />

                    {posts.map(post => <Post key={post.id} post={post}/>)}

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