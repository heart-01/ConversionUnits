import express from "express"
import AccountController from './controllers/account.controller.js'
import { createAccountValidator } from "./validators/account-create.validator.js"
import { validator } from "../../middlewares/validator.js"
import { userAuthentication, adminAuthentication } from "../../middlewares/authentication.js"

const router = express.Router()

router.post('/login', adminAuthentication, AccountController.login)
router.post('/register', adminAuthentication, createAccountValidator, validator, AccountController.register)

export default router