const bcrypt = require('bcrypt');
const User = require('../entities/models/user');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { phone, passcode } = req.body;
            const userExists = await User.findOne({ phone });
            if (userExists) {
                return res.status(409).json({message: 'User already exists'})
            }
            const user = new User({ phone, passcode })
            const salt = await bcrypt.genSalt(10);
            user.passcode = await bcrypt.hash(user.passcode, salt);
            await user.save();
            return res.status(201).json({message: "User was created successfully"});
        } catch(error) {
            return res.status(400).json({error})
        }
    },
    login: async (req, res) => {
        try {
            const { phone, passcode } = req.body;
            const user = await User.findOne({ phone });
            if (user) {
                const validPasscode = await bcrypt.compare(passcode, user.passcode);
                if (validPasscode) {
                    res.status(200).json({message: 'valid password'})
                } else {
                    res.status(400).json({message: 'invalid password'});
                }
            } else {
                res.status(404).json({message: 'User not found'});
            }
        } catch(error) {
            res.status(400).json({error})
        }
    }
}