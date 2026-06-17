const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const uploadDir = path.join(process.cwd(), 'uploads/profile_pictures');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, crypto.randomUUID() + ext);
    }
});

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

const uploadImage = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPG, PNG, and WebP files are allowed'), false);
        }
        cb(null, true);
        console.log('Uploaded file:', file.originalname, 'with MIME type:', file.mimetype);
    }
});

module.exports = { uploadImage };