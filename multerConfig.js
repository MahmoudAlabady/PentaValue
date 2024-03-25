// multerConfig.js

const multer = require('multer');

// Define storage destination and file name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Generate unique file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

// Configure file size limit and storage destination
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1.7 // 1.7 MB file size limit
    }
});

module.exports = upload;
