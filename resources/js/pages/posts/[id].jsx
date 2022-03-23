import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useFetch } from "@/js/utils"
import { usePostState } from "@/js/states/usePostsState"
import { fetchPost } from "@/js/apis/PostApi";
import { Post } from '@/js/components';
import Page404 from '@/js/components/Page404';

export default function () {
    const [isPageNotFound, setIsPageNotFound] = useState(false)
    const { execute, data, status, isLoading, error, isError } = useFetch(fetchPost);
    const { id:postId } = useParams()
    const { post, updatePost } = usePostState(postId)

    useEffect(() => {
        if (status == 'success') {
            updatePost(data)
        } else if (isError) {
            if (error?.response?.status === 404) {
                setIsPageNotFound(true)
            }
        }
    }, [status])

    useEffect(() => {
        execute(postId)
    }, [postId])

    
    if (isPageNotFound) {
        return <Page404 />
    }

    return (
        <div className='max-w-4xl mx-auto my-8 grid grid-cols-5 gap-8'>
            <div className='col-span-3'>

                {
                    !post && isLoading && <div>Loading</div>
                }

                {
                    post && <Post post={post} />
                }
            </div>
        </div>
    )
}