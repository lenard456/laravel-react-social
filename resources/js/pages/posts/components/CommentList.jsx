import { List } from "antd"
import { Comment } from "@/js/components"

const CommentList = ({ comments }) => {
    return (
        <List
            dataSource={comments}
            locale={{
                emptyText: 'Be the first to comment'
            }}
            renderItem={comment => (
                <List.Item className='py-0'>
                    <Comment comment={comment}/>
                </List.Item>
            )}
        />
    )
}

export default CommentList