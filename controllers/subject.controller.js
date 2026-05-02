const {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../services/subject.service')

const getAll = async (req, res) => {
  try {
    const subjects = await getAllSubjects(req.query)
    res.json(subjects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getById = async (req, res) => {
  try {
    const subject = await getSubjectById(req.params.id)
    res.json(subject)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const subject = await createSubject(req.body)
    res.status(201).json(subject)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const subject = await updateSubject(req.params.id, req.body)
    res.json(subject)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deleteSubject(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }