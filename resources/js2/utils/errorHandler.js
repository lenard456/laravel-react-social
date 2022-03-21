import { message } from 'antd'

const handlers = [
    {//Unauthenticated
        condition(error) {
            return error?.response?.status === 401
        },

        callback(error) {
            message.error('Session expired, you need to login again')
        }
    }
]


export default function errorHandler(error)
{
    //Check if we can handle the errors
    //using the handlers above
    let handler = handlers.find(handler => handler.condition(error))
    
    if (handler) {
        handler.callback(error)
    } else {
        //Default handler if no handler can handle the error
        console.log(error)
        message.error('Sorry, An unknown error occurred.')
    }

}