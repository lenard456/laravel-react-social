import { useEffect } from 'react'
import CreatePost from './components/CreatePost'
import { useFeedState } from '@/js/states'
import { fetchFeed } from '@/js/apis/PostApi'
import { useFetch } from '@/js/utils'
import { Post } from '@/js/components'

export default function () {

    const { data, execute, status } = useFetch(fetchFeed)
    const { updateFeed, currentPage, lastPage, posts } = useFeedState()
    const hasNext = lastPage && currentPage < lastPage

    useEffect(() => {
        if (status === 'success') {
            updateFeed({
                currentPage: data.current_page,
                lastPage: data.last_page,
                posts: data.data
            })
        }
    }, [status])

    //On Mounted
    useEffect(() => {
        if (currentPage === 0) {
            execute()
        }
    }, [])

    const seeMore = () => {
        execute(currentPage + 1)
    }

    return (
        <div className='max-w-4xl mx-auto mt-8 grid grid-cols-5 gap-8'>

            <div className='col-span-3'>
                
                <div className='space-y-4'>
                    <CreatePost />
                    {
                        posts.map(post => (
                            <Post post={post} key={post.id} />
                        ))
                    }

                    {
                        hasNext && (
                            <button onClick={seeMore}>See more</button>
                        )
                    }
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