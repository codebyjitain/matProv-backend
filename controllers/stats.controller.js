const { fetchStats } = require('../services/stats.service')

const getStats = async (req, res) => {
  try {
    const stats = await fetchStats()
    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getStats }