const Subject = require('../models/subject.model')

const getAllSubjects = async ({ branchId, semester }) => {
  const filter = {}
  if (branchId) filter.branchId = branchId
  if (semester) filter.semester = Number(semester)

  return await Subject.find(filter)
    .populate('branchId', 'name')
    .sort({ semester: 1, name: 1 })
}

const getSubjectById = async (id) => {
  const subject = await Subject.findById(id).populate('branchId', 'name')
  if (!subject) throw new Error('Subject not found')
  return subject
}

const createSubject = async ({ name, branchId, semester }) => {
  const subject = new Subject({ name, branchId, semester })
  await subject.save()
  return subject
}

const updateSubject = async (id, updates) => {
  const subject = await Subject.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  )
  if (!subject) throw new Error('Subject not found')
  return subject
}

const deleteSubject = async (id) => {
  const subject = await Subject.findByIdAndDelete(id)
  if (!subject) throw new Error('Subject not found')
  return { message: 'Subject deleted' }
}

module.exports = { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject }