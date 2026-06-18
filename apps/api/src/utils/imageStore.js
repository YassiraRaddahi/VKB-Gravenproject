const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Hoofdmap voor alle geüploade afbeeldingen.
const UPLOADS_ROOT = path.join(__dirname, "../../uploads");

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

// We lezen de upload in het geheugen in.
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // ruime grens voor upload 10 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Ongeldig bestandstype. Alleen JPG, PNG of WebP."));
    }
  },
}).single("image");

// Slaat de foto verkleind op als .webp en geeft het pad terug.
async function saveImage(file, folder) {
  if (!file) return null;

  const dir = path.join(UPLOADS_ROOT, folder);
  fs.mkdirSync(dir, { recursive: true });

  const filename = `${crypto.randomUUID()}.webp`;

  await sharp(file.buffer)
    .rotate() // corrigeer oriëntatie op basis van EXIF
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(dir, filename));

  return `/uploads/${folder}/${filename}`;
}

// Verwijdert één foto via zijn pad.
function deleteImage(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;

  const target = path.join(UPLOADS_ROOT, imageUrl.slice("/uploads/".length));
  if (!target.startsWith(UPLOADS_ROOT)) return; // guard tegen path traversal

  fs.promises.unlink(target).catch(() => {});
}

// Leegt een hele submap. Gebruikt bij de database-reset.
function clearImages(folder) {
  fs.rmSync(path.join(UPLOADS_ROOT, folder), { recursive: true, force: true });
}

module.exports = { uploadImage, saveImage, deleteImage, clearImages };
