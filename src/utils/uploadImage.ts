import  multer from "multer"
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./images")) fs.mkdirSync("./images")
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    }
});

const uploadImage = multer({ storage });

export {uploadImage}