import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Input, Button, Checkbox, Form } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { Header } from '@/js/components'
import rules from './rules'
import useLogin from './useLogin'

export default function Login()
{

    const navigate = useNavigate()
    const { user, isLoading, validationErrors, login } = useLogin()

    useEffect(() => {

        if (!user) return

        navigate('/')

    }, [user])

    return (
        <div className="py-8">
            <Card title={<Header/>} className='max-w-md mx-auto rounded'>

                <Form layout='vertical' onFinish={login}>
                    <Form.Item 
                        rules={rules.email} 
                        className='mb-4' 
                        label='Email' 
                        name='email' 
                        {...(validationErrors.email)}
                        >
                        <Input 
                            type='email'
                            prefix={<MailOutlined className='mr-2'/>} 
                            placeholder='Enter your email here' 
                            size='large'
                            className='rounded'
                        />
                    </Form.Item>

                    <Form.Item
                        rules={rules.password}
                        className='mb-4'
                        label='Password'
                        name='password'
                        {...(validationErrors.password)}
                        >
                        <Input.Password
                            prefix={<LockOutlined />}
                            className='rounded'
                            placeholder="Enter your password here." 
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item className='mt-4'>
                        <Checkbox>Remember me</Checkbox>

                        <a className='float-right' href='#'>Forgot Password</a>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' loading={isLoading} className='w-full' type='primary' htmlType='submit'>
                            Sign in
                        </Button>
                        <p className='mt-2 text-center'>
                            Don't have an account? Sign up 
                            <Link to='/register'> here</Link>
                        </p>
                    </Form.Item>

                </Form>

{/*                <form>

                    <div className=''>
                        <label className='text-sm'>Email</label>
                        <Input 
                            prefix={<MailOutlined />}
                            className='rounded'
                            type="email" 
                            placeholder="Enter your email here." 
                            size='large'
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='text-sm'>Password</label>
                        <Input.Password
                            prefix={<LockOutlined />}
                            className='rounded'
                            placeholder="Enter your password here." 
                            size='large'
                        />
                    </div>

                    <div className='mt-4 flex justify-between'>
                        <Checkbox>Remember me</Checkbox>

                        <a href='#'>Forgot Password</a>
                    </div>

                    <div className='mt-4'>
                        <Button size='large' type='primary' htmlType='submit' className='w-full'>
                            Sign In
                        </Button>
                        <p className='mt-2 text-center'>
                            Don't have an account? Sign up 
                            <Link to='/register'> here</Link>
                        </p>
                    </div>

                </form>*/}
            </Card>
        </div>
    )
}