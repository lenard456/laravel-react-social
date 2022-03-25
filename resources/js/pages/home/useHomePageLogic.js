import { useEffect, useState } from 'react'
import { fetchFeed } from '@/js/apis/PostApi'
import { useApi } from '@/js/hooks'
import useFeedAction, { SET_FEED } from '@/js/recoil/actions/useFeedAction'
import { useRecoilValue } from 'recoil'
import feedState from '@/js/recoil/states/feedState'
import feedPostsSelector from '@/js/recoil/selectors/feedPostsSelector'

export default function()
{
    const [initLoading, setInitLoading] = useState(false)
    const { data, execute, status, isLoading } = useApi(fetchFeed)
    const feedDispatcher = useFeedAction()
    const { currentPage, lastPage } = useRecoilValue(feedState)
    const hasNext = lastPage && currentPage < lastPage
    const posts = useRecoilValue(feedPostsSelector)

    useEffect(() => {
        if (status === 'success') {
            feedDispatcher(SET_FEED, {
                currentPage: data.current_page,
                lastPage: data.last_page,
                posts: data.data
            })
        }
    }, [status])

    //On Mounted
    useEffect(() => {
        if (currentPage === 0) {
            setInitLoading(true)
            execute().then(() => {
                setInitLoading(false)
            })
        }
    }, [])

    const seeMore = () => {
        execute(currentPage + 1)
    }

    return { posts, hasNext, seeMore, isLoading, initLoading }
}