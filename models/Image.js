const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       required:
 *         - filename
 *         - path
 *         - mimetype
 *       properties:
 *         filename:
 *           type: string
 *           description: The name of the image file
 *         path:
 *           type: string
 *           description: The storage path of the image
 *         mimetype:
 *           type: string
 *           description: The MIME type of the image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the image was created
 *         metadata:
 *           type: object
 *           description: Additional metadata about the image (e.g., EXIF data)
 */

const ImageSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
    mimetype: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    metadata: {type: Object}
});


const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
