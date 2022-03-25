import { useState, useEffect } from 'react'
import { Avatar, Input, Button } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import { createPost } from '@/js/apis/PostApi' 
import { useApi } from '@/js/hooks'
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'
import useFeedAction, { PREPEND_POST } from '@/js/recoil/actions/useFeedAction'

export default function(){
    const { avatar } = useRecoilValue(currentUserSelector)
    const feedDispatcher = useFeedAction()
    const [ content, setContent ] = useState('')
    const { data, isLoading, execute, status, message } = useApi(createPost)

    useEffect(() => {
        if (status === 'success') {
            message.success('Successfully posted')
            setContent('')
            feedDispatcher(PREPEND_POST, {post: data})
        }
    },[status])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading || content.trim().length === 0) return;
        execute(content)
    }

    return (
        <div className='flex gap-2 bg-white rounded-lg border border-solid p-4 border-gray-300'>
            <Avatar size='large' src={avatar} />
            <form onSubmit={handleSubmit} className='flex-grow flex flex-col gap-2'>
                <Input.TextArea 
                    onChange={e=>setContent(e.target.value)} 
                    className='rounded-lg' 
                    rows={2} 
                    placeholder='Write something...'
                    value={content}
                />
                <div className='flex justify-between'>
                    <div className='space-x-2'>
                        <CameraFilled/>
                        <span>Attach a photo</span>
                    </div>
                    <Button loading={isLoading} htmlType='submit' className='btn-green'>Share</Button>
                </div>

            </form>

        </div>
    )
}