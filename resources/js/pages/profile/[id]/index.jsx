import { useEffect, useState } from 'react'
import { fetchPosts } from "@/js/apis/UserApi"
import { useApi } from "@/js/hooks"
import { useParams } from 'react-router-dom'
import useUserPosts from '@/js/recoil/selectors/useUserPosts'
import useUsersPostIdsAction from '@/js/recoil/actions/useUsersPostIdsAction'
import PostsList from '@/js/components/PostsList/PostsList'
import LoadMore from '@/js/components/LoadMore'

export default function () {

    const { id } = useParams()
    const [initLoading, setInitLoading] = useState(false)
    const {isLoading, status, data, execute} = useApi(fetchPosts)
    const { currentPage, lastPage, posts } = useUserPosts(id)
    const { setUserPostIds } = useUsersPostIdsAction()

    useEffect(() => {
        if (status != 'success') return;
        setUserPostIds(id, {
            currentPage: data.current_page,
            lastPage: data.last_page,
            posts: data.data
        })
    }, [status])
    
    useEffect(() => {
        if (currentPage == 0) {
            setInitLoading(true)
            execute(id).then(response => {
                setInitLoading(false)
                return response
            })
        }
    }, [id])

    const seeMore = () => {
        execute(id, currentPage + 1)
    }

    return (
        <PostsList
            posts={posts}
            initLoading={initLoading}
            isLoading={isLoading}
            loadMore={(
                <LoadMore 
                    hasNext={lastPage && currentPage < lastPage} 
                    seeMore={seeMore}
                    isLoading={isLoading}
                />
            )}
        />
    )
}