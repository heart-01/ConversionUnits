import mongoose from 'mongoose'
import AutoIncrement from '../../../plugins/auto-increment.plugin.js'
import { StatusAccountEnum } from '../../../common/status.account.enum.js'

const { Schema, model } = mongoose

const GroupSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    group_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: StatusAccountEnum.ACTIVE
    },
},{ _id: false, timestamps: true, strict: true })

GroupSchema.plugin(AutoIncrement, { id: 'group_seq', inc_field: '_id' })

const GroupModel = model('group', GroupSchema)

export default GroupModel