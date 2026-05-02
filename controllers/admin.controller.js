const {
  loginAdmin,
  createAdmin,
  getAllAdmins,
  toggleAdminStatus,
  deleteAdmin
} = require('../services/admin.service')

const login = async (req, res) => {
  try {
    const result = await loginAdmin(req.body)
    res.json(result)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const result = await createAdmin(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getAll = async (req, res) => {
  try {
    const admins = await getAllAdmins()
    res.json(admins)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const toggleStatus = async (req, res) => {
  try {
    const result = await toggleAdminStatus(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deleteAdmin(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { login, create, getAll, toggleStatus, remove }