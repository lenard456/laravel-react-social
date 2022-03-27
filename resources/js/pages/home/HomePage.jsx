import CreatePost from './components/CreatePost'
import Suggestion from './components/Suggestion'
import useHomePageLogic from './useHomePageLogic'
import LoadMore from '../../components/LoadMore'
import PostsList from '@/js/components/PostsList/PostsList'

export default function () {

    const { posts, hasNext, seeMore, isLoading, initLoading } = useHomePageLogic()

    return (
        <div className='max-w-4xl mx-auto my-8 grid grid-cols-5 gap-8'>

            <div className='col-span-3'>

                <div className='space-y-4'>

                    <CreatePost />

                    <PostsList 
                        posts={posts}
                        initLoading={initLoading}
                        loadMore={<LoadMore hasNext={hasNext} seeMore={seeMore} isLoading={isLoading} />}
                        isLoading={isLoading}
                    />
                </div>

            </div>

            <div className='col-span-2'>

                <Suggestion />

            </div>

        </div>
    )
}