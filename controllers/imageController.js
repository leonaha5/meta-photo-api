import ImageService from "../services/imageService.js";
import imageService from "../services/imageService.js";


const imageController = {
    async uploadImages(req, res) {
        try {
            const {uploadedBy, belongsTo} = req.body; // Extract new properties

            if (!uploadedBy || !belongsTo) {
                return res
                    .status(400)
                    .json({message: "uploadedBy and belongsTo are required."});
            }

            const uploadedImages = await imageService.uploadImages(
                req.files,
                uploadedBy,
                belongsTo
            );
            console.log(uploadedBy)
            console.log(belongsTo)
            console.log(uploadedImages)

            res.status(201).json(uploadedImages);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getAllImages(req, res) {
        try {
            const images = await imageService.getAllImages()
            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getImageById(req, res) {
        const image = await imageService.getImageById(req.params.id)
        if (image == null) {
            res.status(404).json({message: 'Image not found'});
        } else {
            res.status(200).json(image);
        }
    },

    async getImagesByUserId(req, res) {
        try {
            const images = await imageService.getImagesByUserId(req.params.id)
            if (images.length === 0) {
                return res
                    .status(404)
                    .json({message: "No images found for this user."});
            } else {
                res.status(200).json(images);
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getImagesByBoardId(req, res) {
        try {
            const images = await imageService.findImagesByBoardId(req.params.boardId)

            if (images.length === 0) {
                return res
                    .status(404)
                    .json({message: "No images found for this board."});
            }

            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },


    async getImagesByBoardIdAndUserId(req, res) {
        try {
            const boardId = req.params.boardId;
            const userId = req.params.userId;

            const images = await imageService.getImagesByBoardIdUserId(boardId, userId)

            if (images.length === 0) {
                return res
                    .status(404)
                    .json({message: "No images found for this user in this board."});
            }

            res.status(200).json(images);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async deleteImageById(req, res) {
        try {
            const image = await ImageService.deleteImageById(req.params.id)
            console.log(image);
            if (image == null) {
                res.status(404).json({message: "Image not found"});
            } else {
                res.json({message: "Image Deleted Successfully"});
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async deleteAllImages(req, res) {
        try {
            await ImageService.deleteAllImages()
            res.status(200)
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

}

export default imageController
