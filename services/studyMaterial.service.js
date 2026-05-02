const StudyMaterial = require('../models/studyMaterial.model')
const cloudinary = require('../config/cloudinary')

const getAllMaterials = async ({ subjectId, branchId, semester, type, tag }) => {
  const filter = {}
  if (subjectId) filter.subjectId = subjectId
  if (branchId) filter.branchId = branchId
  if (semester) filter.semester = Number(semester)
  if (type) filter.type = type
  if (tag) filter.tags = { $in: [tag] }

  return await StudyMaterial.find(filter)
    .populate('subjectId', 'name code')
    .populate('branchId', 'name')
    .populate('uploadedBy', 'name email')
    .sort({ createdAt: -1 })
}

const getMaterialById = async (id) => {
  const material = await StudyMaterial.findById(id)
    .populate('subjectId', 'name code')
    .populate('branchId', 'name')
    .populate('uploadedBy', 'name email')
  if (!material) throw new Error('Material not found')
  return material
}

const createMaterial = async ({ title, description, fileUrl, type, subjectId, branchId, semester, uploadedBy, tags }) => {
  const material = new StudyMaterial({
    title,
    description,
    fileUrl,
    type,
    subjectId,
    branchId,
    semester,
    uploadedBy,
    tags: tags || []
  })
  await material.save()
  return material
}

const updateMaterial = async (id, updates) => {
  const material = await StudyMaterial.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  )
  if (!material) throw new Error('Material not found')
  return material
}

const deleteMaterial = async (id) => {
  const material = await StudyMaterial.findById(id)
  if (!material) throw new Error('Material not found')

  // Cloudinary se delete
  const publicId = material.fileUrl.split('/').pop().split('.')[0]
  await cloudinary.uploader.destroy(`campusshelf/${publicId}`, { resource_type: 'raw' })

  await StudyMaterial.findByIdAndDelete(id)
  return { message: 'Material deleted' }
}

module.exports = { getAllMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial }