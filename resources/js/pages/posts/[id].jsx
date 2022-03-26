import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { fetchPost } from "@/js/apis/PostApi";
import { Post } from '@/js/components';
import Page404 from '@/js/components/Page404';
import { Skeleton } from 'antd'
import WriteComment from './components/WriteComment';
import CommentList from './components/CommentList';
import { useApi } from '@/js/hooks';
import usePost from '@/js/recoil/selectors/usePost';
import usePostsAction, { SET_POST } from '@/js/recoil/actions/usePostsAction';
import usePostComments from '@/js/recoil/selectors/usePostComments';

export default function () {
    const [isPageNotFound, setIsPageNotFound] = useState(false)
    const { execute, data, status, isLoading, error, isError } = useApi(fetchPost);
    const { id } = useParams()
    const postsDispatcher = usePostsAction()
    const post = usePost(id)

    const comments = usePostComments(id)

    useEffect(() => {
        if (status == 'success') {
            postsDispatcher(SET_POST, {post:data})
        } else if (isError) {
            if (error?.response?.status === 404) {
                setIsPageNotFound(true)
            }
        }
    }, [status])

    useEffect(() => {
        execute(id)
    }, [id])

    
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

                            <CommentList comments={comments}/>

                            <Skeleton 
                                avatar
                                active
                                loading={isLoading}
                            />

                            <WriteComment post={post}/>

                        </Post>
                    )
                }
            </div>
        </div>
    )
}