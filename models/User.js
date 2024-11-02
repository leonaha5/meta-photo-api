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
    email: {type: String, required: true},
    name: {type: String, required: true},
    joinedBoards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
    passwordId: {type: mongoose.Schema.Types.ObjectId, ref: "UserPassword"},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
