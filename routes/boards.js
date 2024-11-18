const express = require("express");
const Board = require("../models/Board");
const Image = require("../models/Image");

const router = express.Router();

async function getBoard(req, res, next) {
  let board;
  try {
    board = await Board.findById(req.params.id);
    if (board == null) {
      return res.status(404).json({ message: "Cannot find board" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.board = board;
  next();
}

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a board by ID
 */
router.get("/:id", getBoard, (req, res) => {
  res.json(res.board);
});

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 */
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /boards/user/{id}:
 *   get:
 *     summary: Get boards by user id
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const boards = await Board.find({ owner: userId }, undefined, undefined);

    if (boards.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found for this user." });
    }

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 */
router.post("/", async (req, res) => {
  const board = new Board({
    name: req.body.name,
    owner: req.body.owner,
    coverImage: req.body.coverImage,
  });
  try {
    const newUser = await board.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /boards/{id}:
 *   patch:
 *     summary: Update a board by ID
 */
router.patch("/:id", getBoard, async (req, res) => {
  if (req.body.name != null) {
    res.board.name = req.body.name;
  }
  if (req.body.owner != null) {
    res.board.owner = req.body.owner;
  }
  if (req.body.coverImage != null) {
    res.board.coverImage = req.body.coverImage;
  }
  try {
    const updatedBoard = await res.board.save();
    res.json(updatedBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board by ID
 */
router.delete("/:id", getBoard, async (req, res) => {
  try {
    await Board.deleteOne({ _id: req.params.id });
    await Image.deleteMany({ belongsTo: req.params.id });
    res.json({ message: "Board Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
