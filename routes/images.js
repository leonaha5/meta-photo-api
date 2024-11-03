const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const exifParser = require('exif-parser');
const Image = require('../models/Image');

const router = express.Router();

async function getImage(req, res, next) {
    let image
    try {
        image = await Image.findById(req.params.id, undefined, undefined);
        if (image == null) {
            return res.status(404).json({message: 'Cannot find Image'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.image = image
    next()
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/');
        },
        filename: (req, file, cb) => {
            const originalExt = path.extname(file.originalname);
            cb(null, Date.now().toString() + originalExt);
        }
    }),
    // Set limits here
    limits: {fileSize: 1000000} // 1 MB in bytes
});


/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload images
 */
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const uploadedImages = [];
        const {uploadedBy, belongsTo} = req.body; // Extract new properties

        if (!uploadedBy || !belongsTo) {
            return res.status(400).json({message: "uploadedBy and belongsTo are required."});
        }

        for (const file of req.files) {
            const imagePath = path.join(__dirname, '../', file.path);
            const buffer = fs.readFileSync(imagePath);

            const parser = exifParser.create(buffer);
            const result = parser.parse();

            const image = new Image({
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                metadata: result.tags,
                uploadedBy: req.body.uploadedBy,
                belongsTo: req.body.belongsTo
            });

            await image.save();
            uploadedImages.push(image);
        }

        res.status(201).json(uploadedImages);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 */
router.get('/', async (req, res) => {
    try {
        const images = await Image.find(undefined, undefined, undefined);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get an image by ID
 */
router.get('/:id', getImage, async (req, res) => {
    res.status(200).json(res.image);
})


/**
 * @swagger
 * /images/user/{id}:
 *   get:
 *     summary: Get an images by user id
 */
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const images = await Image.find({uploadedBy: userId}, undefined, undefined);

        if (images.length === 0) {
            return res.status(404).json({message: 'No images found for this user.'});
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


/**
 * @swagger
 * /images/board/{id}:
 *   get:
 *     summary: Get an images by board id
 */
router.get('/board/:boardId', async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const images = await Image.find({belongsTo: boardId}, undefined, undefined);

        if (images.length === 0) {
            return res.status(404).json({message: 'No images found for this board.'});
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


/**
 * @swagger
 * /images/board/{id}:
 *   get:
 *     summary: Get an images by both board id and user id
 */
router.get('/board-user/:boardId/:userId', async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const userId = req.params.userId;

        const images = await Image.find({belongsTo: boardId, uploadedBy: userId}, undefined, undefined);

        if (images.length === 0) {
            return res.status(404).json({message: 'No images found for this user in this board.'});
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Delete an image by ID
 */
router.delete('/:id', getImage, async (req, res) => {
    try {
        await Image.deleteOne({_id: req.params.id});
        res.json({message: 'Image Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /images:
 *   patch:
 *     summary: Delete all images
 */
router.delete('/', async () => {
    await Image.deleteMany({})
})


/**
 * @swagger
 * /images/files/{filename}:
 *   get:
 *     summary: Access uploaded images
 */
router.use('/files', express.static('images'));

module.exports = router;