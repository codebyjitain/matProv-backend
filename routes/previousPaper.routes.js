const express = require('express')
const router = express.Router()
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')
const { getAll, getById, create, update, remove } = require('../controllers/previousPaper.controller')
const { verifyAdmin } = require('../middleware/auth.middleware')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'campusshelf/papers',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
})

const upload = multer({ storage })

// Public
router.get('/', getAll)
router.get('/:id', getById)

// Admin only
router.post('/', verifyAdmin, upload.single('file'), create)
router.put('/:id', verifyAdmin, update)
router.delete('/:id', verifyAdmin, remove)

module.exports = router