export default function() {
    return (
        <button className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
            <LikeOutlined className={false? 'text-blue-500' : ''}/>
        </button>
    )
}