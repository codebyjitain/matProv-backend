const Branch = require('../models/branch.model')

const getAllBranches = async () => {
  return await Branch.find().sort({ name: 1 })
}

const getBranchById = async (id) => {
  const branch = await Branch.findById(id)
  if (!branch) throw new Error('Branch not found')
  return branch
}

const createBranch = async ({ name, code }) => {
  const existing = await Branch.findOne({ code: code.toUpperCase() })
  if (existing) throw new Error('Branch code already exists')

  const branch = new Branch({ name, code })
  await branch.save()
  return branch
}

const updateBranch = async (id, updates) => {
  const branch = await Branch.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  )
  if (!branch) throw new Error('Branch not found')
  return branch
}

const deleteBranch = async (id) => {
  const branch = await Branch.findByIdAndDelete(id)
  if (!branch) throw new Error('Branch not found')
  return { message: 'Branch deleted' }
}

module.exports = { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch }