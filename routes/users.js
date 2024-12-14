import express from "express"
import userController from "../controllers/userController.js";
import User from "../models/User.js";

const usersRoutes = express.Router();


async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: "Cannot find user"});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user;
    next();
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 */
usersRoutes.get("/", userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 */
usersRoutes.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 */
usersRoutes.patch("/:id", userController.patchUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 */
usersRoutes.delete("/:id", userController.deleteUser);

export default usersRoutes;
