import GroupService from '../services/group.service.js'

const GroupController = {
  createGroup: async (req, res) => {
    try {
      const created = await GroupService.create(req.body)

      res.status(201).json({
        succes: true,
        data: created
      })
    } catch (error) {
      console.error(`[ERROR ON GET GROUP] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getAllGroup: async (req, res) => {
    try {
      const products = await GroupService.getAll()
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET GROUP] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  getGroupByIds: async (req, res) => {
    try {
      const ids = req.params.ids.split(',')
      const products = await GroupService.getAll({ _id: { $in: ids } })
    
      res.status(200).json({
        success: true,
        data: products
      })
    } catch (error) {
      console.error(`[ERROR ON GET GROUP] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  editGroupById: async (req, res) => {
    try {
      console.log(req.body, req.params);
      const { id } = req.params
      const updated = await GroupService.updateById(id, req.body)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON EDIT GROUP] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  deleteGroupById: async (req, res) => {
    try {
      const { id } = req.params
      const updated = await GroupService.deleteById(id)
    
      res.status(200).json({
        success: true,
        data: updated
      })
    } catch (error) {
      console.error(`[ERROR ON DELETE GROUP] => ${error.message}`)
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default GroupController