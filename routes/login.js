require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const UserPassword = require('../models/UserPassword');
const jwt = require('jsonwebtoken')

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.post('/register', async (req, res) => {

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

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password


    const user = await User.findOne({email: email}, undefined, undefined)
    console.log(user)
    console.log('aaa')
    const userPassword = await UserPassword.findOne({_id: user.passwordId}, undefined, undefined)

    if (userPassword && userPassword.password === password) {
        const token = jwt.sign(user._doc, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.json({token: token})
    } else {
        res.status(400).json({message: 'Invalid Credentials'})
    }

})

module.exports = router;