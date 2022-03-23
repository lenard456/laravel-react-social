import { useEffect, useState } from 'react'
import { useFeedState } from '@/js/states'
import { fetchFeed } from '@/js/apis/PostApi'
import { useFetch } from '@/js/utils'

export default function()
{
    const [initLoading, setInitLoading] = useState(false)
    const { data, execute, status, isLoading } = useFetch(fetchFeed)
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