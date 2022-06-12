import mongoose from 'mongoose'
import AutoIncrement from '../../../plugins/auto-increment.plugin.js'
import { StatusAccountEnum } from '../../../common/status.account.enum.js'

const { Schema, model } = mongoose

const MeasurementSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    fromUnitId: {
        type: Number,
        required: true,
    },
    toUnitId: {
        type: Number,
        required: true,
    },
    group_id: {
        type: Number,
        required: true,
    },
    value: {
        type: Schema.Types.Decimal128,
        default: 0
    },
    status: {
        type: String,
        default: StatusAccountEnum.ACTIVE
    },
},{ _id: false, timestamps: true })

MeasurementSchema.plugin(AutoIncrement, { id: 'measurement_seq', inc_field: '_id' })

const MeasurementModel = model('measurement', MeasurementSchema)

export default MeasurementModel