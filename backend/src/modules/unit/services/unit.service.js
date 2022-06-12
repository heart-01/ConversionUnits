import { StatusAccountEnum } from '../../../common/status.account.enum.js'
import UnitModel from '../models/unit.schema.js'

const UnitService = {
    create(payload) {
        return new UnitModel(payload).save()
    },
    getAll(query){
        return UnitModel.find({ ...query, status: StatusAccountEnum.ACTIVE })
    },
    getUnitAllGroupName() {
        return UnitModel.aggregate(
            [
                { $lookup: {
                    from: 'groups',
                    localField: "group_id",
                    foreignField: "_id",
                    as: "fromGroup"
                }}
            ]
        )
    },
    getUnitGroupId(id) {
        return UnitModel.find({ group_id: id, status: StatusAccountEnum.ACTIVE })
    },
    updateById(id, payload) {
        return UnitModel.findOneAndUpdate({ _id: id }, payload)
    },
    deleteById(id) {
        return UnitModel.findOneAndUpdate({ _id: id }, { status: StatusAccountEnum.DELETED })
    }
}
export default UnitService