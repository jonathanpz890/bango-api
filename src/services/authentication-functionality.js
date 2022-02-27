const bcrypt = require('bcrypt');
const User = require('../entities/models/user');
const Property = require('../entities/models/property');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, phone, password } = req.body;
            let properties = await Property.find()
            properties = properties.sort(() => Math.random() - 0.5).slice(0, 25);
            const userExists = await User.findOne({ phone });
            if (userExists) {
                return res.status(409).json({ message: 'User already exists' })
            }
            let user = new User({ name, phone, password, properties })
            user.password = await bcrypt.hash(user.password, 10);
            await user.save();
            user = user.toObject();
            delete user.password;
            return res.status(201).json({
                success: true,
                data: {
                    user
                }
            });
        } catch (error) {
            return res.status(400).json({ error })
        }
    },
    login: async (req, res) => {
        try {
            const { phone, password } = req.body;
            let user = await User.findOne({ phone }).populate({ path: 'properties' });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    res.status(200).json({
                        success: true,
                        data: {
                            user
                        }
                    })
                } else {
                    res.status(400).json({ message: 'invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}