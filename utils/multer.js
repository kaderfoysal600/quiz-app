const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const imageFormatSelector = (req, file, cb) => {
    const alllowedImageFormats = /jpeg|jpg|png|gif/;

    const extname = alllowedImageFormats.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = alllowedImageFormats.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true);
    }else {
        const error = new Error("Only image files of jpeg, jpg, png, gif can be uploaded");
        return cb(error, false);
        
    }
};

const upload = multer({
    storage: storage,
    fileFilter: imageFormatSelector
    
})

module.exports = upload;