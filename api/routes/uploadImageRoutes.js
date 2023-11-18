const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const crypto = require('crypto');
const sharp = require('sharp');
const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

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

const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');

router.post('/image', upload.single('image'), async (req, res) => {
    // Resize Image
    const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer();

    const imageName = `${req.file.fieldname}_${randomImageName()}_${
        req.file.originalname
    }`;

    const params = {
        Bucket: awsBucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    res.status(200).json({ message: 'Image uploaded successfully' });
});

router.get('/image', async (req, res) => {
    const { imageName } = req.body;

    // const products = await Product.find();
    // for (const product of products) {
    const getObjectParams = {
        bucket: awsBucketName,
        // key: product.imageName,
        key: imageName,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await s3.getSignedUrl(s3, command, { expiresIn: 3600 });
    // product.imageUrl = url;
    // }

    res.status(200).json({ image: url });
});

// router.delete('/image/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);

//     const params = {
//         bucket: bucketName,
//         key: product.imageName,
//     };

//     const command = new DeleteObjectCommand(params);
//     await s3.send(command);

//     res.status(204).send({ message: 'Product deleted successfully', product });
// });

module.exports = router;
