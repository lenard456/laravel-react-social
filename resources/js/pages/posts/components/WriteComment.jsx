import { useAuth } from '@/js/contexts/AuthContext'
import { Comment, Avatar, Button, Input } from 'antd'
import { useState, useEffect } from 'react'
import { comment } from '@/js/apis/PostApi'
import { useFetch } from '@/js/utils'
import usePostsCommentsState from '@/js/states/usePostsCommentsState'

export default function ({post}) {
    const { updatePostComments } = usePostsCommentsState()
    const { isLoading, execute, status, data } = useFetch(comment)
    const { currentUser } = useAuth()
    const [ content, setContent ] = useState('')

    useEffect(() => {
        if (status == 'success') {
            updatePostComments(post.id, data)
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