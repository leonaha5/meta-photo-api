import jwt from "jsonwebtoken";
import loginService from "../services/loginService.js";
import userService from "../services/userService.js";

const ACCESS_TOKEN_SECRET = "secret01";

const loginController = {

    async register(req, res) {
        try {
            const userPassword = await loginService.createUserPassword(req.body.password)
            console.log(userPassword)
            const user = await loginService.createUser({
                email: req.body.email,
                name: req.body.name,
                joinedBoards: req.body.joinedBoards,
                passwordId: userPassword._id
            })
            const token = jwt.sign(user._doc, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
            res.json({token: token})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    async login(req, res) {
        const email = req.body.email
        const password = req.body.password

        const user = await userService.getUserByEmail(email)
        const userPassword = await loginService.findPasswordById(user.passwordId)

        if (userPassword && userPassword.password === password) {
            const token = jwt.sign(user._doc, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
            res.json({token: token})
        } else {
            res.status(400).json({message: 'Invalid Credentials'})
        }

    }

}

export default loginController;

