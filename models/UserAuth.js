const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAuth:
 */
const UserAuthSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const UserAuth = mongoose.model('UserAuth', UserAuthSchema);
module.exports = UserAuth;
