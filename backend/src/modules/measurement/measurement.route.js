import express from "express"
import { validator } from "../../middlewares/validator.js"
import { userAuthentication, adminAuthentication } from "../../middlewares/authentication.js"
import MeasurementController from './controllers/measurement.controller.js'

const router = express.Router()

router.post('', MeasurementController.createMeasurement)
router.get('/', MeasurementController.getAllMeasurement)
router.get('/:ids', MeasurementController.getMeasurementByIds)
router.get('/unit/converter', MeasurementController.getMeasurementUnitId)
router.get('/unit/duplicate/:fromUnitId/:toUnitId', MeasurementController.getMeasurementUnitIdDuplicate)
router.put('/:id', MeasurementController.editMeasurementById)
router.delete('/:id', MeasurementController.deleteMeasurementById)

export default router