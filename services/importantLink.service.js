const ImportantLink = require('../models/importantLink.model')

const getAllLinks = async ({ category, branchId, subjectId }) => {
  const filter = {}
  if (category) filter.category = category
  if (branchId) filter.branchId = branchId
  if (subjectId) filter.subjectId = subjectId

  return await ImportantLink.find(filter)
    .populate('branchId', 'name')
    .populate('subjectId', 'name code')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
}

const getLinkById = async (id) => {
  const link = await ImportantLink.findById(id)
    .populate('branchId', 'name')
    .populate('subjectId', 'name code')
    .populate('createdBy', 'name email')
  if (!link) throw new Error('Link not found')
  return link
}

const createLink = async ({ title, url, description, category, branchId, subjectId, createdBy }) => {
  const link = new ImportantLink({
    title, url, description, category,
    branchId: branchId || null,
    subjectId: subjectId || null,
    createdBy
  })
  await link.save()
  return link
}

const updateLink = async (id, updates) => {
  const link = await ImportantLink.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  )
  if (!link) throw new Error('Link not found')
  return link
}

const deleteLink = async (id) => {
  const link = await ImportantLink.findByIdAndDelete(id)
  if (!link) throw new Error('Link not found')
  return { message: 'Link deleted' }
}

module.exports = { getAllLinks, getLinkById, createLink, updateLink, deleteLink }