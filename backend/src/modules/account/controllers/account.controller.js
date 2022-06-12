import humps from 'humps'
import bcrypt from 'bcrypt'
import AccountService from '../services/account.service.js'
import { createToken } from "../../../middlewares/authentication.js"

export default {
    async register (req, res) {
        const { username, password, fname, lname } = humps.camelizeKeys(req.body)

        const passwordHash = bcrypt.hashSync(password, 10)
        console.log(passwordHash);
        
        const created = await AccountService.register({ username, password: passwordHash, fname, lname })

        const token = createToken({  
            fname: created.fname,
            lname: created.lname,
            username: created.username,
            role: created.role
        })

        res.status(201).json({
            success: true,
            data: {
                created,
                token
            }
        })
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body
            const found = await AccountService.getAccountByUsername(username)
            if(!found){
                res.status(403).json({
                    success: true,
                    data: 'Username or Password incorrect'
                })
            }else{
                const isCorrect = bcrypt.compareSync(password, found.password)
                if(isCorrect) {
                    const token = createToken({  
                        fname: found.fname,
                        lname: found.lname,
                        username: found.username,
                        role: found.role
                    })
                    const personal = {
                        fname: found.fname,
                        lname: found.lname,
                        username: found.username,
                        role: found.role
                    }
                    res.status(200).json({
                        success: true,
                        data: {
                            personal,
                            token
                        }
                    })
                }else{
                    res.status(401).json({
                        success: true,
                        data: 'Username or Password incorrect'
                    })
                }
            }
        } catch (error) {
            console.error(`[ERROR ON LOGIN] => ${error.message}`)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    getUsers: (req, res) => {
        res.json({
            success: true
        })
    }
}