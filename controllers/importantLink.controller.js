const {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink
} = require('../services/importantLink.service')

const getAll = async (req, res) => {
  try {
    const links = await getAllLinks(req.query)
    res.json(links)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getById = async (req, res) => {
  try {
    const link = await getLinkById(req.params.id)
    res.json(link)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const link = await createLink({
      ...req.body,
      createdBy: req.admin._id
    })
    res.status(201).json(link)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const link = await updateLink(req.params.id, req.body)
    res.json(link)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await deleteLink(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }