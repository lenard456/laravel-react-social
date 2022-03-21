import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Input, Button, Form, message } from 'antd'
import { Logo } from '@components'
import { AuthApi } from '@apis'
import rules from './validationRules'
import { mapValidationErrors } from '@utils'

export default function Register() 
{
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isSuccess) return;
        message.success('Account Registered successfully')
        navigate('/login')
    }, [isSuccess])

    useEffect(() => {
        if (error == null) return;

        if (error?.response?.status === 422) {
            const { errors } = error.response.data
            setValidationErrors(mapValidationErrors(errors))
            return;
        }

        message.error('An unknown error occured')
    }, [error])

    const register = (formData) => {
        if (isLoading) return;
        (async() => {
            setIsLoading(true)
            const [data, error] = await AuthApi.register(formData).then(response => [response.data, null]).catch(error => [null, error])
            console.log({data, error})
            if (data) setIsSuccess(true)
            if (error) setError(error)
            setIsLoading(false)
        })()
    }

    return (
        <div className="py-8">
            <Card title={<Logo/>} className='max-w-md mx-auto rounded'>
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