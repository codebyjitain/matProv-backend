const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/dbConfig')
const subjectRoutes = require('./routes/subject.routes')
const adminRoutes = require('./routes/admin.routes')
const studyMaterialRoutes = require('./routes/studyMaterial.routes')
const previousPaperRoutes = require('./routes/previousPaper.routes')
const importantLinkRoutes = require('./routes/importantLink.routes')
const branchRoutes = require('./routes/branch.routes')
const statsRoutes = require('./routes/stats.routes')

const app = express()

const allowedOrigins = [
  "https://matprov.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps / postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));
app.use(express.json())


app.use('/api/subjects', subjectRoutes)
app.use('/api/admin', adminRoutes)

app.use('/api/materials', studyMaterialRoutes)
app.use('/api/papers', previousPaperRoutes)
app.use('/api/links', importantLinkRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/stats', statsRoutes)

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()
  app.listen(PORT, "0.0.0.0",() => console.log(`Server running on port ${PORT}`))
}

startServer()