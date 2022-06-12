import { StatusAccountEnum } from '../../../common/status.account.enum.js'
import MeasurementModel from '../models/measurement.schema.js'

const MeasurementService = {
    create(payload) {
        return new MeasurementModel(payload).save()
    },
    getAll(query){
        return MeasurementModel.find({ ...query, status: StatusAccountEnum.ACTIVE })
    },
    getMeasurementUnitIdDuplicate(fromUnitId, toUnitId){
        return MeasurementModel.find({ fromUnitId, toUnitId, status: StatusAccountEnum.ACTIVE })
    },
    getMeasurementUnitId() {
        return MeasurementModel.aggregate(
            [
                { $lookup: {
                    from: 'groups',
                    localField: "group_id",
                    foreignField: "_id",
                    as: "fromGroup"
                }},
                { $lookup: {
                    from: 'units',
                    localField: "fromUnitId",
                    foreignField: "_id",
                    as: "fromUnit"
                }},
                { $lookup: {
                    from: 'units',
                    localField: "toUnitId",
                    foreignField: "_id",
                    as: "toUnit"
                }}
            ]
        )
    },
    updateById(id, payload) {
        return MeasurementModel.findOneAndUpdate({ _id: id }, payload)
    },
    deleteById(id) {
        return MeasurementModel.findOneAndUpdate({ _id: id }, { status: StatusAccountEnum.DELETED })
    }
}
export default MeasurementService