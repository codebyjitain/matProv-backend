const PreviousPaper = require('../models/previousPaper.model')
const cloudinary = require('../config/cloudinary')

const getAllPapers = async ({ subjectId, branchId, semester, year, examType }) => {
  const filter = {}
  if (subjectId) filter.subjectId = subjectId
  if (branchId) filter.branchId = branchId
  if (semester) filter.semester = Number(semester)
  if (year) filter.year = Number(year)
  if (examType) filter.examType = examType

  return await PreviousPaper.find(filter)
    .populate('subjectId', 'name code')
    .populate('branchId', 'name')
    .populate('uploadedBy', 'name email')
    .sort({ year: -1 })
}

const getPaperById = async (id) => {
  const paper = await PreviousPaper.findById(id)
    .populate('subjectId', 'name code')
    .populate('branchId', 'name')
    .populate('uploadedBy', 'name email')
  if (!paper) throw new Error('Paper not found')
  return paper
}

const createPaper = async ({ title, year, examType, fileUrl, subjectId, branchId, semester, uploadedBy }) => {
  const paper = new PreviousPaper({
    title, year, examType, fileUrl,
    subjectId, branchId, semester, uploadedBy
  })
  await paper.save()
  return paper
}

const updatePaper = async (id, updates) => {
  const paper = await PreviousPaper.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  )
  if (!paper) throw new Error('Paper not found')
  return paper
}

const deletePaper = async (id) => {
  const paper = await PreviousPaper.findById(id)
  if (!paper) throw new Error('Paper not found')

  const publicId = paper.fileUrl.split('/').pop().split('.')[0]
  await cloudinary.uploader.destroy(`campusshelf/${publicId}`, { resource_type: 'raw' })

  await PreviousPaper.findByIdAndDelete(id)
  return { message: 'Paper deleted' }
}

module.exports = { getAllPapers, getPaperById, createPaper, updatePaper, deletePaper }