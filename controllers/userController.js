import userService from "../services/userService.js";

const userController = {

    async getAllUsers(req, res) {
        try {
            res.status(200).json(await userService.getUserAllUsers());
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id, req, res);
            if (user == null) {
                res.status(404).json({message: "User not found"})
            } else {
                res.status(200).json(user);
            }

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    

    async patchUser(req, res) {
        try {
            const updatedUser = await userService.patchUserById(req.params.id, req.body);
            res.json(updatedUser);
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({message: err.message});
            }
            res.status(500).json({message: err.message});
        }
    },

    async deleteUser(req, res) {
        try {
            await userService.deleteUserById(req.params.id);
            res.status(200).send();
        } catch (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({message: err.message});
            }
            res.status(500).json({message: err.message});
        }
    }
}

export default userController;

