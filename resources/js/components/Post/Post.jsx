import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { LikeOutlined, CommentOutlined } from '@ant-design/icons'
import usePostsState from '@/js/states/usePostsState'
import useUsersState from '@/js/states/useUsersState'
import moment from 'moment'

export default function({ children, post }) {
    const { updatePost } = usePostsState()
    const { users } = useUsersState()
    const { id, content, isLike, user_id, created_at } = post
    const user = users[user_id]

    const toggleLike = () => {
        updatePost({ ...post, isLike: !isLike })
    }

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' src={user.avatar}/>
                <div className='flex justify-between'>
                    <div className='flex flex-col leading-3'>
                        <span className='font-bold'>{ user.name} </span>
                        <span className='text-sm'>{ moment(created_at).fromNow() }</span>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                 { content }
            </div>

            <div>
                1 Like
            </div>

            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <LikeButton />
                <Link to={`/posts/${id}`} className='flex-grow py-1 text-center bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></Link>
            </div>

            {
                !!children && (
                    <div className='mt-1 mb-4 border-t border-gray-300'>
                        { children }
                    </div>
                )
            }

        </div>
    )
}