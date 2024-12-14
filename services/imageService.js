import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import exifParser from "exif-parser";
import Image from "../models/Image.js";

const imageService = {

    async uploadImages(files, uploadedBy, belongsTo) {
        const uploadedImages = [];
        for (const file of files) {
            const imagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../", file.path);
            const buffer = fs.readFileSync(imagePath);
            let metadata;
            try {
                const parser = exifParser.create(buffer);
                const result = parser.parse();
                metadata = result.tags;
            } catch (err) {
                metadata = {};
            }

            const image = new Image({
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                metadata: metadata,
                uploadedBy: uploadedBy,
                belongsTo: belongsTo,
            });

            await image.save();
            uploadedImages.push(image);
        }
        return uploadedImages
    },


    getAllImages() {
        return Image.find(undefined, undefined, undefined);
    },


    getImageById(id) {
        return Image.findById(id, undefined, undefined);
    }
    ,

    getImagesByUserId(id) {
        return Image.find(
            {uploadedBy: id},
            undefined,
            undefined,
        );
    },

    findImagesByBoardId(id) {
        return Image.find(
            {belongsTo: id},
            undefined,
            undefined,
        );

    },

    getImagesByBoardIdUserId(boardId, userId) {

        return Image.find(
            {belongsTo: boardId, uploadedBy: userId},
            undefined,
            undefined,
        );
    },

    deleteImageById(id) {
        return Image.findByIdAndDelete(id, undefined);
    },

    deleteAllImages() {
        Image.deleteMany({});
    }
}

export default imageService