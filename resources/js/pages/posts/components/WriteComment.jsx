import { Comment, Avatar, Button, Input } from 'antd'
import { useState, useEffect } from 'react'
import { comment } from '@/js/apis/PostApi'
import usePostsCommentsState from '@/js/states/usePostsCommentsState'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '@/js/states/useAuthStates'
import { useApi } from '@/js/hooks'

export default function ({post}) {
    const { dispatch } = usePostsCommentsState()
    const { isLoading, execute, status, data } = useApi(comment)
    const currentUser = useRecoilValue(currentUserState)
    const [ content, setContent ] = useState('')

    
    useEffect(() => {
        if (status == 'success') {
            dispatch('APPEND_POST_COMMENT', {
                postId: post.id,
                comment: data
            })
        }
    }, [status])

    const handleSubmit = () => {
        if (isLoading || content.trim().length == 0) return;
        execute(post.id, content).then(response => {
            setContent('')
            return response
        })
    }

    return (
        <Comment
            avatar={<Avatar src={currentUser.avatar} />}
            content={
                <div className='space-y-2'>
                    <Input.TextArea value={content} onChange={e => setContent(e.target.value)} rows={2} placeholder='Write a comment' />
                    <Button onClick={handleSubmit} loading={isLoading} type='primary'>Submit</Button>
                </div>
            }
        />
    )
}