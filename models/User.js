const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         joinedBoards:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of board IDs that the user has joined
 */
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    joinedBoards: {type: Array, default: []},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
