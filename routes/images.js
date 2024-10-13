const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const exifParser = require('exif-parser');
const Image = require('../models/Image'); // Import the Image model

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

// Upload image route
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imagePath = path.join(__dirname, '../', req.file.path);
        const buffer = fs.readFileSync(imagePath);

        // Parse EXIF data
        const parser = exifParser.create(buffer);
        const result = parser.parse();

        // Store image data along with metadata
        const image = new Image({
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            metadata: result.tags
        });

        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get all images route
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find(undefined, undefined, undefined);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Serve images from uploads directory
router.use('/uploads', express.static('uploads'));

// Export the router
module.exports = router;