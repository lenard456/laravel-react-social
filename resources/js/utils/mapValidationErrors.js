export default function (validationErrors) {

    //clone
    let errors = {...validationErrors}

    Object.keys(errors).forEach(field => {
        errors[field] = {
            validateStatus: 'error',
            help: errors[field].join(',')
        }
    })

    return errors
}