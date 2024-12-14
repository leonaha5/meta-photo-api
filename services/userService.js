import User from "../models/User.js"
import UserPassword from "../models/UserPassword.js"

const userService = {
    async getUserById(id) {
        return User.findById(
            id,
            undefined,
            undefined)
    },

    async getUserByEmail(email) {
        return User.findOne(
            {email: email},
            undefined,
            undefined)
    },

    async getUserAllUsers() {
        return User.find(
            undefined,
            undefined,
            undefined);
    },

    async patchUserById(id, changes) {
        const user = await userService.getUserById(id)
        if (!user) {
            throw new Error('User not found');
        }
        Object.keys(changes).forEach((field) => {
            user[field] = changes[field];
        });
        return user.save()
    },

    async deleteUserById(id) {
        const user = await User.findOneAndDelete({_id: id}, undefined);

        if (!user) {
            throw new Error('User not found');
        }
        await UserPassword.deleteOne({_id: user.passwordId});
    }
}

export default userService

