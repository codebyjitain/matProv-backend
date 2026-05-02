const express = require('express')
const router = express.Router()
const { getStats } = require('../controllers/stats.controller')
const { verifyAdmin } = require('../middleware/auth.middleware')

router.get('/', verifyAdmin, getStats)

module.exports = router