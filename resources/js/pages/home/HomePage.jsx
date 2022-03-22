import CreatePost from './components/CreatePost'
import { Post } from '@/js/components'
import Suggestion from './components/Suggestion'
import useHomePageLogic from './useHomePageLogic'

export default function () {

    const { posts, hasNext, seeMore } = useHomePageLogic()


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
                
                <Suggestion />

            </div>

        </div>
    ) 
}