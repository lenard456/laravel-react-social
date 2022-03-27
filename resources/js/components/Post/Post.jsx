import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import moment from 'moment'
import LikeButton from './LikeButton'
import useUser from '@/js/recoil/selectors/useUser'

export default function({ children, post }) {
    const { id, content, user_id, created_at, likerIds, comments_count} = post
    const user = useUser(user_id)
    const likeCount = likerIds.length

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' src={user.avatar}/>
                <div className='flex justify-between'>
                    <div className='flex flex-col leading-3'>
                        <Link to={`/profile/${user_id}`} className='font-bold'>{user.name} </Link>
                        <span className='text-sm'>{ moment(created_at).fromNow() }</span>
                    </div>
                </div>
            </div>

            <div className='my-4 text-base'>
                 { content }
            </div>

            <div className='text-xs flex justify-between py-1'>
                <span>{ likeCount > 0 && `${likeCount} ${likeCount > 1 ? 'Likes' : 'Like'}` }</span>
                <span>{ comments_count > 0 && `${comments_count} ${comments_count > 1 ? 'Comments': 'Comment'}` }</span>
            </div>
            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <LikeButton post={post}/>
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