const multer = require('multer');

const MIME_TYPE = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png': 'png', 
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "images/profilePictures");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    },
});

//500000 Bytes (500 Ko)
module.exports = multer({storage, limits: { fileSize: 500000 }}).single("image");