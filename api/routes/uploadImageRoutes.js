const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get('/image', upload.single('image'), (req, res) => {
    console.log('req.file', req.file);
});

module.exports = router;
