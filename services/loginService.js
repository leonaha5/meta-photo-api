import UserPassword from "../models/UserPassword.js";
import User from "../models/User.js";

const loginService = {
    async createUserPassword(password) {
        return await new UserPassword({password}).save()
    },

    async createUser(user) {
        return await new User(user).save()
    },
    async findPasswordById(id) {
        return UserPassword.findById(id, undefined, undefined)
    }
}

export default loginService

