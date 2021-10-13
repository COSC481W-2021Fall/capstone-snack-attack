import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
import fs from "fs";

// function to be used as file filter in multer storage
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  //make sure extname and mimetype both match specified filetypes
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      // `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// http://localhost:5000/api/upload
router.post("/", upload.single("image"), (req, res) => {
  // console.log("req.body:", req.body); // ex: 123

  const filePath = req.file.path;
  //ex: uploads\image-1603018408516.jpg

  let newFilePath = `uploads/pid_${req.body.productId}.jpg`;
  //ex: uploads\\pid_123.jpg

  fs.renameSync(filePath, newFilePath); // change the file name

  res.send(`/${newFilePath}`);
});

export default router;
