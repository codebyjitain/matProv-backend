const {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../services/branch.service')

const getAll = async (req, res) => {
  try {
    const branches = await getAllBranches()
    res.json(branches)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getById = async (req, res) => {
  try {
    const branch = await getBranchById(req.params.id)
    res.json(branch)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const branch = await createBranch(req.body)
    res.status(201).json(branch)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const branch = await updateBranch(req.params.id, req.body)
    res.json(branch)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deleteBranch(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }