const express = require('express')
const router = express.Router()
const { login, create, getAll, toggleStatus, remove } = require('../controllers/admin.controller')
const { verifyAdmin, verifySuperAdmin } = require('../middleware/auth.middleware')

// Public
router.post('/login', login)

// Super admin only
router.post('/', verifySuperAdmin, create)
router.get('/', verifySuperAdmin, getAll)
router.patch('/:id/toggle', verifySuperAdmin, toggleStatus)
router.delete('/:id', verifySuperAdmin, remove)

module.exports = router