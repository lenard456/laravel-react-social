export default {
    email: [
        {
            required: true,
            message: 'Email is required.'
        },
        {
            type: 'email',
            message: 'Not a valid email.'
        }
    ],

    name: [
        {
            required: true,
            message: 'Name is required.'
        }
    ],

    password: [
        {
            required: true,
            message: 'Password is required.'
        },
        {
            min: 8,
            message: 'Password must be atleast 8 characters.'
        },
        {
            //Minimum of 8 letters must have letter and number
            pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{0,}$/,
            message: 'Password must contain letter and a number.'
        }
    ],

    password_confirmation: [
        {
            required: true,
            message: 'Please confirm your password.'
        },
        ({ getFieldValue  }) => ({
            validator: async(_, value) => {
                if (!value || getFieldValue('password') === value) {
                    return
                }
                throw new Error('The two password you entered does not match')
            }
        })
    ]
}