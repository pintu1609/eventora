// 

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storageGuestList = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "ristaCsv", maxCount: 1 },
  { name: "upiCsv", maxCount: 1 },
  { name: "rozarPayCsv", maxCount: 1 },
]);

const uploadImg = multer({ storage }).fields([
  { name: "img", maxCount: 1 },
]);

const uploadGuestSceenshot = multer({ storage: storageGuestList }).fields([
  { name: "img", maxCount: 1 },
]);

module.exports = {
  upload,
  uploadImg,
  uploadGuestSceenshot,
};
