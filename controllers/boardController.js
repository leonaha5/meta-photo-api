import boardService from "../services/boardService.js";

const boardController = {

    async getAllBoards(req, res) {
        try {
            res.status(200).json(await boardService.getAllBoards());
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getBoardById(req, res) {
        try {
            const board = await boardService.getBoardById(req.params.id, req, res);
            if (board == null) {
                res.status(404).json({message: "board not found"})
            } else {
                res.status(200).json(board);
            }

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async patchBoard(req, res) {
        try {
            const updatedboard = await boardService.patchBoardById(req.params.id, req.body);
            res.json(updatedboard);
        } catch (err) {
            if (err.message === 'Board not found') {
                return res.status(404).json({message: err.message});
            }
            res.status(500).json({message: err.message});
        }
    },

    async deleteBoard(req, res) {
        try {
            await boardService.deleteBoardById(req.params.id);
            res.status(200).send();
        } catch (err) {
            if (err.message === 'Board not found') {
                return res.status(404).json({message: err.message});
            }
            res.status(500).json({message: err.message});
        }
    },
    async addBoard(req, res) {
        const newBoard = await boardService.addBoard({
            name: req.body.name,
            owner: req.body.owner,
            coverImage: req.body.coverImage,
        });
        try {
            res.status(201).json(newBoard);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getBoardsByUserId(req, res) {
        try {
            const boards = await boardService.findBoardByUserId(req.params.userId);
            console.log(boards)
            if (boards.length === 0) {
                return res
                    .status(404)
                    .json({message: "No images found for this user."});
            }

            res.status(200).json(boards);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

}

export default boardController;

