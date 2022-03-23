import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useFetch } from "@/js/utils"
import { usePostState } from "@/js/states/usePostsState"
import { fetchPost } from "@/js/apis/PostApi";
import { Post } from '@/js/components';
import Page404 from '@/js/components/Page404';
import { Skeleton } from 'antd'
import WriteComment from './components/WriteComment';
import { usePostCommentsState } from '@/js/states/usePostsCommentsState';
import CommentList from './components/CommentList';

export default function () {
    const [isPageNotFound, setIsPageNotFound] = useState(false)
    const { execute, data, status, isLoading, error, isError } = useFetch(fetchPost);
    const { id:postId } = useParams()
    const { post, updatePost } = usePostState(postId)
    const { postComments:comments } = usePostCommentsState(postId)

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

                <Skeleton 
                    avatar 
                    className='rounded-lg bg-white p-4 border border-gray-300' 
                    loading={!post && isLoading} 
                    active
                />
                {
                    post && (
                        <Post post={post}>
                            <Skeleton 
                                avatar
                                active
                                loading={isLoading}
                            />

                            <CommentList comments={comments}/>

                            <WriteComment post={post}/>

                        </Post>
                    )
                }
            </div>
        </div>
    )
}