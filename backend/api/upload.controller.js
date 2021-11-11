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
        cb(null, "../frontend/public/uploads/");
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



router.post("/product/add/image", upload.single("image"), (req, res) => {
    const filePath = req.file.path;

    let dbFilePath = `uploads/item_${req.body.title}_adminID_${req.body.adminId}.jpg`;
    let newFilePath = '../frontend/public/' + dbFilePath;

    fs.renameSync(filePath, newFilePath); // change the file name

    res.send(`/${dbFilePath}`);
});

export default router;