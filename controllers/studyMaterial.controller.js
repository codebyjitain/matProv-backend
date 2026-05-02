const {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} = require('../services/studyMaterial.service')

const getAll = async (req, res) => {
  try {
    const materials = await getAllMaterials(req.query)
    res.json(materials)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getById = async (req, res) => {
  try {
    const material = await getMaterialById(req.params.id)
    res.json(material)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const { title, description, type, subjectId, branchId, semester, tags } = req.body
    const material = await createMaterial({
      title,
      description,
      type,
      subjectId,
      branchId,
      semester,
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: req.admin._id,
      fileUrl: req.file.path
    })
    res.status(201).json(material)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const material = await updateMaterial(req.params.id, req.body)
    res.json(material)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deleteMaterial(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }