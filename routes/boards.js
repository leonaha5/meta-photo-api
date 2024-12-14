import express from "express"
import boardController from "../controllers/boardController.js";

const boardsRoutes = express.Router();

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a board by ID
 */
boardsRoutes.get("/:id", boardController.getBoardById);

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 */
boardsRoutes.get("/", boardController.getAllBoards);

/**
 * @swagger
 * /boards/user/{id}:
 *   get:
 *     summary: Get boards by user id
 */
boardsRoutes.get("/user/:userId", boardController.getBoardsByUserId);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 */
boardsRoutes.post("/", boardController.addBoard);


/**
 * @swagger
 * /boards/{id}:
 *   patch:
 *     summary: Update a board by ID
 */
boardsRoutes.patch("/:id", boardController.patchBoard);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board by ID
 */
boardsRoutes.delete("/:id", boardController.deleteBoard);

export default boardsRoutes;
