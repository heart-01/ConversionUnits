import { StatusAccountEnum } from '../../../common/status.account.enum.js'
import GroupModel from '../models/group.schema.js'

const GroupService = {
    create(payload) {
        return new GroupModel(payload).save()
    },
    getAll(query){
        return GroupModel.find({ ...query, status: StatusAccountEnum.ACTIVE })
    },
    getOneById(id) {
        return GroupModel.findOne({ _id: id })
    },
    updateById(id, payload) {
        return GroupModel.findOneAndUpdate({ _id: id }, payload)
    },
    deleteById(id) {
        return GroupModel.findOneAndUpdate({ _id: id }, { status: StatusAccountEnum.DELETED })
    }
}
export default GroupService