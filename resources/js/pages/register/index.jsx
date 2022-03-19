import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message, Card, Input, Button, Checkbox, Form, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import { Header } from '@/js/components'
import rules from './rules'
import useRegister from './useRegister'

export default function Register() 
{

    const navigate = useNavigate()
    const { isLoading, validationErrors, user, register } = useRegister()

    useEffect(() => {
        if (!user) return
        message.success('Account successfully created, you will be redirected to the login page.', 5)
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }, [user])

    return (
        <div className="py-8">
            <Card title={<Header/>} className='max-w-md mx-auto rounded'>
                <Form layout='vertical' onFinish={register}>

                    <Form.Item 
                        rules={rules.email} 
                        className='mb-4' 
                        label='Email' 
                        name='email' 
                        {...(validationErrors.email)}
                        >
                        <Input 
                            type='email' 
                            placeholder='Enter your email here' 
                            size='large'
                            className='rounded'
                        />
                    </Form.Item>

                    <Form.Item 
                        rules={rules.name}
                        className='mb-4' 
                        label='Name' 
                        name='name'
                        {...(validationErrors.name)}
                    >
                        <Input 
                            type='text' 
                            placeholder='Enter your full name here' 
                            size='large'
                            className='rounded'
                        />
                    </Form.Item>                        

                    <Form.Item 
                        rules={rules.password} 
                        className='mb-4' 
                        label='Password' 
                        name='password' 
                        required 
                        tooltip={
                            <span>
                                - Must be atleast 8 characters<br/>
                                - Must Contain Letters and Numbers
                            </span>
                        }
                        {...(validationErrors.password)}
                        >
                        <Input.Password 
                            placeholder='Enter your password here' 
                            size='large'
                            className='rounded'
                        />
                    </Form.Item>                        

                    <Form.Item rules={rules.password_confirmation} className='mb-4' label='Confirm Password' name='password_confirmation' required>
                        <Input.Password 
                            placeholder='Confrm your password here' 
                            size='large'
                            className='rounded'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' loading={isLoading} className='w-full' type='primary' htmlType='submit'>
                            Create Account
                        </Button>
                        <p className='mt-2 text-center'>
                            Already have an account? Log in 
                            <Link to='/login'> here</Link>
                        </p>
                    </Form.Item>


                </Form>
            </Card>
        </div>
    )
}