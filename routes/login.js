import express from 'express'
import loginController from "../controllers/loginController.js";

const loginRoutes = express.Router();

loginRoutes.post('/register', loginController.register)

loginRoutes.post('/login', loginController.login)

export default loginRoutes;