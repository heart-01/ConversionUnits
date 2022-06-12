import mongoose from 'mongoose'
import { RoleEnum } from '../../../common/roles.enum.js'
import { StatusAccountEnum } from '../../../common/status.account.enum.js'
import AutoIncrement from '../../../plugins/auto-increment.plugin.js'

const { Schema, model } = mongoose
const AccountSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    role: {
        type: String,
        default: RoleEnum.ADMIN
    },
    status: {
        type: String,
        default: StatusAccountEnum.ACTIVE
    },
},{ _id: false, timestamps: true, strict: true })

AccountSchema.plugin(AutoIncrement, { id: 'account_seq', inc_field: '_id' })

const AccountModel = model('accounts', AccountSchema)

export default AccountModel