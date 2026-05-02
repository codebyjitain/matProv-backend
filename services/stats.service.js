const Branch = require('../models/branch.model')
const Subject = require('../models/subject.model')
const StudyMaterial = require('../models/studyMaterial.model')
const PreviousPaper = require('../models/previousPaper.model')
const ImportantLink = require('../models/importantLink.model')
const Admin = require('../models/admin.model')

const fetchStats = async () => {
  const [branches, subjects, materials, papers, links, admins] = await Promise.all([
    Branch.countDocuments(),
    Subject.countDocuments(),
    StudyMaterial.countDocuments(),
    PreviousPaper.countDocuments(),
    ImportantLink.countDocuments(),
    Admin.countDocuments()
  ])

  return { branches, subjects, materials, papers, links, admins }
}

module.exports = { fetchStats }