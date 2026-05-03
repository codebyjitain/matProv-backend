const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/studyMaterial.controller");
const { verifyAdmin } = require("../middleware/auth.middleware");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname.replace(/\s+/g, '_')
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
    
    return {
      folder: 'matprov/papers',
      resource_type: 'auto',   // ✅ best
      public_id: nameWithoutExt
    }
  }
})

const upload = multer({ storage });

// Public routes
router.get("/", getAll);
router.get("/:id", getById);

// Admin only
router.post("/", verifyAdmin, upload.single("file"), create);
router.put("/:id", verifyAdmin, update);
router.delete("/:id", verifyAdmin, remove);

module.exports = router;
