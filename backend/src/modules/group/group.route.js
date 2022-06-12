import express from "express"
import { validator } from "../../middlewares/validator.js"
import { userAuthentication, adminAuthentication } from "../../middlewares/authentication.js"
import GroupController from './controllers/group.controller.js'

const router = express.Router()

router.post('', GroupController.createGroup)
router.get('/', GroupController.getAllGroup)
router.get('/:ids', GroupController.getGroupByIds)
router.put('/:id', GroupController.editGroupById)
router.delete('/:id', GroupController.deleteGroupById)

export default router