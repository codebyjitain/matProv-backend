const express = require('express')
const router = express.Router()
const { getAll, getById, create, update, remove } = require('../controllers/branch.controller')
const { verifyAdmin } = require('../middleware/auth.middleware')

// Public
router.get('/', getAll)
router.get('/:id', getById)

// Admin only
router.post('/', verifyAdmin, create)
router.put('/:id', verifyAdmin, update)
router.delete('/:id', verifyAdmin, remove)

module.exports = router