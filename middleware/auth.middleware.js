const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model')

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token missing' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id).select('-password')
    if (!admin || !admin.isActive) return res.status(401).json({ message: 'Unauthorized' })
    req.admin = admin
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const verifySuperAdmin = async (req, res, next) => {
  verifyAdmin(req, res, () => {
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ message: 'Super admin access only' })
    }
    next()
  })
}

module.exports = { verifyAdmin, verifySuperAdmin }