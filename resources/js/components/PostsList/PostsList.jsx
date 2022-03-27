import { List, Skeleton } from 'antd'
import Post from '@/js/components/Post'

export default ({ posts, initLoading, loadMore, isLoading }) => (
    <>
        <List
            loading={initLoading}
            dataSource={posts}
            renderItem={post => (
                <List.Item>
                    <Post post={post} />
                </List.Item>
            )}
            loadMore={loadMore}
        />
        <Skeleton loading={!initLoading && isLoading} active />
    </>
)