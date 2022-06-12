import UnitService from '../services/unit.service.js'

const UnitController = {
  createUnit: async (req, res) => {
    try {
      const created = await UnitService.create(req.body)

      res.status(201).json({
        succes: true,
        data: created
      })
    } catch (error) {
      console.error(`[ERROR ON GET UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getAllUnit: async (req, res) => {
    try {
      const found = await UnitService.getAll()
    
      res.status(200).json({
        success: true,
        data: found
      })
    } catch (error) {
      console.error(`[ERROR ON GET UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getUnitByIds: async (req, res) => {
    try {
      const ids = req.params.ids.split(',')
      const products = await UnitService.getAll({ _id: { $in: ids } })
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getUnitAllGroupName: async (req, res) => {
    try {
      const found = await UnitService.getUnitAllGroupName()
    
      res.status(200).json({
        success: true,
        data: found
      })
    } catch (error) {
      console.error(`[ERROR ON GET UNIT ALL JOIN GROUP NAME] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getUnitGroupId: async (req, res) => {
    try {
      const { groupId } = req.params
      const found = await UnitService.getUnitGroupId(+groupId)
      
      res.status(200).json({
        success: true,
        data: found
      })
    } catch (error) {
      console.error(`[ERROR ON GET UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  editUnitById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await UnitService.updateById(id, req.body)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON EDIT UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  deleteUnitById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await UnitService.deleteById(id)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON DELETE UNIT] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default UnitController