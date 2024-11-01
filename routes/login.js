const express = require('express');
const User = require('../models/User');
const UserAuth = require('../models/UserAuth');
const jwt = require('jsonwebtoken')

const router = express.Router();

const ACCESS_TOKEN_SECRET = "secret01"

router.post('/register', async (req, res) => {

    const user = new User({
        name: req.body.name,
        joinedBoards: req.body.joinedBoards
    })

    const userauth = new UserAuth({
        email: req.body.email,
        password: req.body.password
    })

    console.log(req.body)

    try {
        await user.save()
        await userauth.save()
        const token = jwt.sign({name: req.body.name}, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        res.json({token: token})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

router.post('/login', (req, res) => {
    const username = req.body.username
    const user = {name: username}

    const token = jwt.sign(user, ACCESS_TOKEN_SECRET,)
    res.json({token: token})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(authHeader)
    console.log(token)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

router.get('/test-jwt', authenticateToken, (req, res) => {
    res.json(posts)
})

module.exports = router;