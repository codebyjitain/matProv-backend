const Admin = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email })
  if (!admin) throw new Error('Invalid credentials')

  if (!admin.isActive) throw new Error('Account is deactivated')

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  }
}

const createAdmin = async ({ name, email, password, role }) => {
  const existing = await Admin.findOne({ email })
  if (existing) throw new Error('Email already registered')

  const hashed = await bcrypt.hash(password, 10)
  const admin = new Admin({ name, email, password: hashed, role: role || 'editor' })
  await admin.save()

  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive
  }
}

const getAllAdmins = async () => {
  return await Admin.find({}, '-password').sort({ createdAt: -1 })
}

const toggleAdminStatus = async (id) => {
  const admin = await Admin.findById(id)
  if (!admin) throw new Error('Admin not found')

  admin.isActive = !admin.isActive
  await admin.save()

  return { id: admin._id, isActive: admin.isActive }
}

const deleteAdmin = async (id) => {
  const admin = await Admin.findByIdAndDelete(id)
  if (!admin) throw new Error('Admin not found')
  return { message: 'Admin deleted' }
}

module.exports = { loginAdmin, createAdmin, getAllAdmins, toggleAdminStatus, deleteAdmin }