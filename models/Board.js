import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the board
 *         boardImageIDs:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image IDs associated with the board
 *         userIDs:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who have access to the board
 *         owner:
 *           type: string
 *           description: The ID of the owner of the board
 */
const BoardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    coverImage: {type: String, required: false, default: ''},
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
