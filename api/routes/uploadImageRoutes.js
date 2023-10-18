const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const awsBucketName = require('../config/env').AWS_BUCKET_NAME;
const awsBucketRegion = require('../config/env').AWS_BUCKET_REGION;
const awsAccessKey = require('../config/env').AWS_ACCESS_KEY;
const awsSecretAccessKey = require('../config/env').AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
    },
    region: awsBucketRegion,
});

const upload = multer({ storage: storage });

router.get('/image', upload.single('image'), (req, res) => {
    console.log('req.file', req.file);

    const params = {
        Bucket: awsBucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
});

module.exports = router;
