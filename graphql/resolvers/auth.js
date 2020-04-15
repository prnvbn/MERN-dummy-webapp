const User  = require('../../models/users');
const bcrypt   = require('bcryptjs');

module.exports = {
    createUser: async args => {
        try {
            const creator = await User.findOne({ email: args.userInput.email });
            if (creator) {
                throw new Error('User with the same email already exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user_1 = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user_1.save();
            return { 
                ...result._doc, password: null,
                createdAt: dateToString(result._doc.createdAt),
                updatedAt: dateToString(result._doc.updatedAt)
             };
        }
        catch (err) {
            throw err;
        }
    }
}
