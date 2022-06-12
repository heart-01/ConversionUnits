import { checkSchema } from "express-validator"

export const createAccountValidator = checkSchema({
    username: {
        in: ['body'],
        errorMessage: 'username is required',
        isString: true
    },
    password: {
        in: ['body'],
        custom: {
            options: (value) => {
                const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                if(!regex.test(value)) {
                    throw new Error('min 8 characters which contain at least one numeric digit and a special character')
                }

                return true 
            }
        }
    },
    fname: {
        in: ['body'],
        errorMessage: 'firstname is required',
        isString: true
    },
    lname: {
        in: ['body'],
        errorMessage: 'lastname is required',
        isString: true
    },
    // email: {
    //     in: ['body'],
    //     custom: {
    //         options: (value) => {
    //             const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //             if(!regex.test(value)) {
    //                 throw new Error('Please enter valid email')
    //             }

    //             return true 
    //         }
    //     }
    // },
})