import moment from 'moment'
import { Avatar,  Comment, Tooltip} from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import useUser from '@/js/recoil/selectors/useUser'
import { Link } from 'react-router-dom'

export default function({comment})
{
    const user = useUser(comment.user_id)

    return (
        <Comment 
            actions={[
                <span key='comment-like'>
                    <LikeOutlined />
                    <span className='pl-1'>Like</span>
                </span>,
                <span key='comment-reply'>View Replies</span>
            ]}
            author={<Link to={`/profile/${comment.user_id}`}>{user.name}</Link>}
            avatar={<Avatar src={user.avatar} alt="Han Solo" />}
            content={
                <p>{comment.content}</p>
            }
            datetime={
                <Tooltip title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(comment.created_at).fromNow()}</span>
                </Tooltip>
            }
        />
    )
}