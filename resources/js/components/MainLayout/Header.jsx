import { Input, Button } from 'antd'
import { SearchOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons'
import HeaderAvatar from './HeaderAvatar'
import Logo from '../Logo'
import { Link } from 'react-router-dom'

export default function () {

    return (
        <header className='bg-white shadow h-16 sticky top-0 w-full z-[1]'>

            {/*Container*/}
            <div className='max-w-5xl mx-auto h-full flex justify-between items-center'>

                <div className='flex'>
                    {/* Logo */}
                    <Link to='/'>
                        <Logo />
                    </Link>

                    {/* Searchbox */}
                    <div className='ml-8'>
                        <Input
                            prefix={<SearchOutlined className='text-gray-400' />}
                            className='rounded-lg'
                            size='large'
                            placeholder='Search for users or post'
                        />
                    </div>

                </div>


                {/* Right Menu */}
                <div>
                    <Button className='rounded-lg text-gray-400' icon={<BellOutlined />} />
                    <Button className='ml-2 rounded-lg text-gray-400' icon={<MessageOutlined />} />

                    <HeaderAvatar />
                </div>

            </div>
        </header>
    )
}