import { useState, useEffect } from 'react'
import { Avatar, Input, Button } from 'antd'
import { UserOutlined, CameraFilled } from '@ant-design/icons'
import { createPost } from '@/js/apis/PostApi' 
import { useFeedState } from '@/js/states'
import { useApi } from '@/js/hooks'

export default function(){
    const { dispatch } = useFeedState()
    const [ content, setContent ] = useState('')
    const { data, isLoading, execute, status, message } = useApi(createPost)

    useEffect(() => {
        if (status === 'success') {
            message.success('Successfully posted')
            setContent('')

            dispatch('PREPEND_POST', data)

        }
    },[status])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLoading || content.trim().length === 0) return;
        execute(content)
    }

    return (
        <div className='flex gap-2 bg-white rounded-lg border border-solid p-4 border-gray-300'>
            <Avatar size='large' icon={<UserOutlined />} />
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