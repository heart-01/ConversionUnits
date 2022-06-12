import mongoose from 'mongoose'
import AutoIncrement from '../../../plugins/auto-increment.plugin.js'
import { StatusAccountEnum } from '../../../common/status.account.enum.js'

const { Schema, model } = mongoose

const unitSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    unit_name: {
        type: String,
        required: true,
    },
    group_id: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: StatusAccountEnum.ACTIVE
    },
},{ _id: false, timestamps: true })

unitSchema.plugin(AutoIncrement, { id: 'unit_seq', inc_field: '_id' })

const UnitModel = model('unit', unitSchema)

export default UnitModel