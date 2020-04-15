const User   = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

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
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('Invalid email');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('Invalid password')
        }
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            'sometopsecretkey',
            {expiresIn:'1h'}
        );
        return  { userId: user.id, token: token, tokenExpiration: 1};
    }
};
