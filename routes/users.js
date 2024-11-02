const express = require('express');
const User = require('../models/User');
const UserPassword = require('../models/UserPassword');


const router = express.Router();

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 */
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 */
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.joinedBoards != null) {
        res.user.joinedBoards = req.body.joinedBoards
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 */
router.delete('/:id', getUser, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        await UserPassword.deleteOne({_id: user.passwordId});
        await User.deleteOne({_id: req.params.id});
        res.json({message: 'User Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;