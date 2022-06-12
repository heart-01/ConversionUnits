import MeasurementService from '../services/measurement.service.js'

const MeasurementController = {
  createMeasurement: async (req, res) => {
    try {
      const created = await MeasurementService.create(req.body)

      res.status(201).json({
        succes: true,
        data: created
      })
    } catch (error) {
      console.error(`[ERROR ON GET MEASUREMENT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getAllMeasurement: async (req, res) => {
    try {
      const products = await MeasurementService.getAll()
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET MEASUREMENT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getMeasurementByIds: async (req, res) => {
    try {
      const ids = req.params.ids.split(',')
      const products = await MeasurementService.getAll({ _id: { $in: ids } })
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET MEASUREMENT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getMeasurementUnitId: async (req, res) => {
    try {
      const { unitId } = req.params
      const found = await MeasurementService.getMeasurementUnitId()
      
      res.status(200).json({
        success: true,
        data: found
      })
    } catch (error) {
      console.error(`[ERROR ON GET MEASUREMENT BY UNIT ID] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getMeasurementUnitIdDuplicate: async (req, res) => {
    try {
      const { fromUnitId, toUnitId } = req.params
      const found = await MeasurementService.getMeasurementUnitIdDuplicate(fromUnitId, toUnitId)
      
      res.status(200).json({
        success: true,
        data: found
      })
    } catch (error) {
      console.error(`[ERROR ON GET MEASUREMENT BY UNIT ID] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  editMeasurementById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await MeasurementService.updateById(id, req.body)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON EDIT MEASUREMENT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  deleteMeasurementById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await MeasurementService.deleteById(id)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON DELETE MEASUREMENT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default MeasurementController