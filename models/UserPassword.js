import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPassword:
 */
const UserPasswordSchema = new mongoose.Schema({
    password: {type: String, required: true},
});

const UserPassword = mongoose.model('UserPassword', UserPasswordSchema);
export default UserPassword;
