import { Input, Button } from 'antd'
import { SearchOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons'
import HeaderAvatar from './HeaderAvatar'

export default function() {

    return (
        <header className='bg-white shadow h-16 sticky top-0 w-full z-[1]'>

            {/*Container*/}
            <div className='max-w-5xl mx-auto h-full flex justify-between items-center'>

                <div className='flex'>
                    {/* Logo */}
                    <span className='font-bold block text-2xl text-center'>
                        <span className='text-red-400'>Laravel</span>
                        <span> + </span> 
                        <span className='text-blue-400'>React</span>
                    </span>

                    {/* Searchbox */}
                    <div className='ml-8'>
                        <Input 
                            prefix={<SearchOutlined className='text-gray-400'/>}
                            className='rounded-lg' 
                            size='large' 
                            placeholder='Search for users or post'
                        />
                    </div>

                </div>


                {/* Right Menu */}
                <div>
                    <Button className='rounded-lg text-gray-400' icon={<BellOutlined />}/>
                    <Button className='ml-2 rounded-lg text-gray-400' icon={<MessageOutlined />}/>

                    <HeaderAvatar />
                </div>

            </div>
        </header>
    )
}