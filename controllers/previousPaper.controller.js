const {
  getAllPapers,
  getPaperById,
  createPaper,
  updatePaper,
  deletePaper
} = require('../services/previousPaper.service')

const getAll = async (req, res) => {
  try {
    const papers = await getAllPapers(req.query)
    res.json(papers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getById = async (req, res) => {
  try {
    const paper = await getPaperById(req.params.id)
    res.json(paper)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const { title, year, examType, subjectId, branchId, semester } = req.body
    const paper = await createPaper({
      title,
      year: Number(year),
      examType,
      subjectId,
      branchId,
      semester: Number(semester),
      uploadedBy: req.admin._id,
      fileUrl: req.file.path
    })
    res.status(201).json(paper)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const paper = await updatePaper(req.params.id, req.body)
    res.json(paper)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deletePaper(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }