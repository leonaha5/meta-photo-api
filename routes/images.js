import express from "express"
import multer from "multer"
import path from "path"
import imageController from "../controllers/imageController.js"

const imagesRouter = express.Router();


const uploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images/");
        },
        filename: (req, file, cb) => {
            const originalExt = path.extname(file.originalname);
            cb(null, Date.now().toString() + originalExt);
        },
    }),
    limits: {fileSize: 1000000},
});

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload images
 */
imagesRouter.post("/", uploadMiddleware.array("images", 10), imageController.uploadImages);

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 */
imagesRouter.get("/", imageController.getAllImages);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get an image by ID
 */
imagesRouter.get("/:id", imageController.getImageById);

/**
 * @swagger
 * /images/user/{id}:
 *   get:
 *     summary: Get an images by user id
 */
imagesRouter.get("/user/:userId", imageController.getImagesByUserId);

/**
 * @swagger
 * /images/board/{id}:
 *   get:
 *     summary: Get an images by board id
 */
imagesRouter.get("/board/:boardId", imageController.getImagesByBoardId);

/**
 * @swagger
 * /images/board/{id}:
 *   get:
 *     summary: Get an images by both board id and user id
 */
imagesRouter.get("/board-user/:boardId/:userId", imageController.getImagesByBoardIdAndUserId);

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Delete an image by ID
 */
imagesRouter.delete("/:id", imageController.deleteImageById);

/**
 * @swagger
 * /images:
 *   patch:
 *     summary: Delete all images
 */
imagesRouter.delete("/", imageController.deleteAllImages);

/**
 * @swagger
 * /images/files/{filename}:
 *   get:
 *     summary: Access uploaded images
 */
imagesRouter.use("/files", express.static("images"));

export default imagesRouter;
