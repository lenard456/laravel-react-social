import CreatePost from './components/CreatePost'
import { Post } from '@/js/components'
import Suggestion from './components/Suggestion'
import useHomePageLogic from './useHomePageLogic'
import { List, Skeleton } from 'antd'
import LoadMore from './components/LoadMore'

export default function () {

    const { posts, hasNext, seeMore, isLoading, initLoading } = useHomePageLogic()

    return (
        <div className='max-w-4xl mx-auto my-8 grid grid-cols-5 gap-8'>

            <div className='col-span-3'>

                <div className='space-y-4'>

                    <CreatePost />

                    <List
                        loading={initLoading}
                        dataSource={posts}
                        renderItem={post => (
                            <List.Item>
                                <Post post={post} />
                            </List.Item>
                        )}
                        loadMore={<LoadMore hasNext={hasNext} seeMore={seeMore} isLoading={isLoading} />}
                    />
                    <Skeleton loading={!initLoading && isLoading} active />
                </div>

            </div>

            <div className='col-span-2'>

                <Suggestion />

            </div>

        </div>
    )
}