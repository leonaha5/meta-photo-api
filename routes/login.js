import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import UserPassword from '../models/UserPassword.js'
import loginController from "../controllers/loginController.js";

const loginRoutes = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

loginRoutes.post('/register', async (req, res) => {

    const userPassword = new UserPassword({
        password: req.body.password
    })

    try {
        const userPasswordInstance = await userPassword.save()
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            joinedBoards: req.body.joinedBoards,
            passwordId: userPasswordInstance._id
        })
        await user.save()
        const token = jwt.sign(user._doc, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.json({token: token})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

loginRoutes.post('/login', loginController.login)

export default loginRoutes;