# MatProv Backend

A Node.js and Express-based REST API server for the MatProv educational platform. Manages study materials, exam papers, subjects, branches, admin authentication, and more with MongoDB and Cloudinary integration.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)

---

## Features
✨ **Core Functionality:**
- Admin authentication and role-based management
- Branch and subject management
- Study material uploads with Cloudinary integration
- Previous exam papers repository
- Important links management
- Statistics and analytics endpoints
- Password hashing with bcryptjs
- JWT token-based authentication
- CORS enabled for frontend integration
- Health check endpoint

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB + Mongoose 9.5.0
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Password Security:** bcryptjs 3.0.3
- **File Storage:** Cloudinary with multer
- **File Upload:** multer 2.1.1
- **Environment:** dotenv 17.4.2
- **CORS:** cors 2.8.6
- **Dev Tool:** nodemon 3.1.14 (development)

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for file uploads)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd matprov/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/matProv

# JWT Secret for token signing
JWT_SECRET=your_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port
PORT=5000
```

### 4. Start the server
```bash
npm start
```

The server will start on `http://localhost:5000`

**For development with auto-reload:**
```bash
npm run dev
```

## Running the Server

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Health Check
Once running, verify the server is healthy:
```bash
curl http://localhost:5000/healthz
```

Expected response:
```json
{ "status": "OK" }
```

---

## Folder Structure

```
backend/
├── config/
│   ├── cloudinary.js         # Cloudinary configuration
│   └── dbConfig.js            # MongoDB connection setup
│
├── controllers/               # Business logic for routes
│   ├── admin.controller.js
│   ├── branch.controller.js
│   ├── importantLink.controller.js
│   ├── previousPaper.controller.js
│   ├── stats.controller.js
│   ├── studyMaterial.controller.js
│   └── subject.controller.js
│
├── middleware/
│   └── auth.middleware.js     # JWT authentication middleware
│
├── models/                    # Mongoose schemas
│   ├── admin.model.js
│   ├── branch.model.js
│   ├── importantLink.model.js
│   ├── previousPaper.model.js
│   ├── studyMaterial.model.js
│   └── subject.model.js
│
├── routes/                    # API route definitions
│   ├── admin.routes.js
│   ├── branch.routes.js
│   ├── importantLink.routes.js
│   ├── previousPaper.routes.js
│   ├── stats.routes.js
│   ├── studyMaterial.routes.js
│   └── subject.routes.js
│
├── services/                  # Business logic/service layer
│   ├── admin.service.js
│   ├── branch.service.js
│   ├── importantLink.service.js
│   ├── previousPaper.service.js
│   ├── stats.service.js
│   ├── studyMaterial.service.js
│   └── subject.service.js
│
├── .env                       # Environment variables (not tracked in git)
├── .gitignore                 # Git exclude patterns
├── server.js                  # Express server entry point
└── package.json               # NPM dependencies and scripts
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST/PUT/DELETE` | `/subjects` | Subject management |
| `GET/POST/PUT/DELETE` | `/admin` | Admin management & authentication |
| `GET/POST/PUT/DELETE` | `/materials` | Study material management |
| `GET/POST/PUT/DELETE` | `/papers` | Previous exam papers |
| `GET/POST/PUT/DELETE` | `/links` | Important links |
| `GET/POST/PUT/DELETE` | `/branches` | Branch management |
| `GET` | `/stats` | Statistics and analytics |
| `GET` | `/healthz` | Server health check |

### Example Requests

**Health Check:**
```bash
curl http://localhost:5000/healthz
```

**Get all subjects:**
```bash
curl http://localhost:5000/api/subjects
```

**Create a new subject (requires auth):**
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Mathematics", "branchId": "..."}'
```

---

## Database Models

### Admin
- Authentication and user management
- Role-based access control

### Branch
- Engineering/academic branch information
- Hierarchy for organizing subjects

### Subject
- Subject details and descriptions
- Links to branches and materials

### Study Material
- Course materials, notes, resources
- Cloudinary file URLs
- Subject association

### Previous Paper
- Exam papers database
- Year and semester information
- File storage via Cloudinary

### Important Link
- Resource links and references
- Categorization by subject/branch

---

## CORS Configuration

The server is configured to accept requests from:
- Frontend: `https://matprov.netlify.app`
- Postman and mobile apps (no origin)

Update the `allowedOrigins` array in `server.js` to add more domains.

---

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Authentication

Protected routes require JWT tokens in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are issued during admin login and should be stored securely on the client.

---

## Development

### Adding a New Route
1. Create model in `models/`
2. Create service in `services/`
3. Create controller in `controllers/`
4. Create route file in `routes/`
5. Import and use route in `server.js`

### Debugging
- Check `.env` file for correct configuration
- Review MongoDB connection string
- Verify Cloudinary credentials
- Check server logs for detailed error messages

---

## Deployment

This backend is designed to deploy on platforms like:
- Heroku
- Railway
- Vercel
- AWS
- DigitalOcean

Set environment variables in your hosting platform's dashboard.

---

## License
ISC

## Author
MatProv Development Team
