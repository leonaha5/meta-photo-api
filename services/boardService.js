import Board from "../models/Board.js"

const boardService = {
    async getBoardById(id) {
        return Board.findById(
            id,
            undefined,
            undefined)
    },

    async getAllBoards() {
        return Board.find(
            undefined,
            undefined,
            undefined);
    },

    async patchBoardById(id, changes) {
        const board = await boardService.getBoardById(id)
        if (!board) {
            throw new Error('Board not found');
        }
        Object.keys(changes).forEach((field) => {
            board[field] = changes[field];
        });
        return board.save()
    },

    async addBoard(board) {
        return await new Board(board).save()
    },

    async deleteBoardById(id) {
        const board = await Board.findOneAndDelete({_id: id}, undefined);

        if (!board) {
            throw new Error('Board not found');
        }
    },

    async findBoardByUserId(id) {
        return Board.find({owner: id}, undefined, undefined);
    },

}

export default boardService

