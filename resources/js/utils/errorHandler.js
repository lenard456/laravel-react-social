import { message } from 'antd'

const handlers = [
    //Add handler here
]


export default function errorHandler(error)
{
    //Check if we can handle the errors
    //using the handlers above
    handlers.forEach(handler => {
        if(handler.condition(error))
            return handler.callback(error)
    })

    //Default handler if no handler can handle the error
    console.log(error)
    message.error('Sorry, An unknown error occurred.')
}