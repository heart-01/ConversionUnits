import express from "express"
import { validator } from "../../middlewares/validator.js"
import { userAuthentication, adminAuthentication } from "../../middlewares/authentication.js"
import UnitController from './controllers/unit.controller.js'

const router = express.Router()

router.post('', UnitController.createUnit)
router.get('/', UnitController.getAllUnit)
router.get('/:ids', UnitController.getUnitByIds)
router.get('/join/group', UnitController.getUnitAllGroupName)
router.get('/group/:groupId', UnitController.getUnitGroupId)
router.put('/:id', UnitController.editUnitById)
router.delete('/:id', UnitController.deleteUnitById)

export default router