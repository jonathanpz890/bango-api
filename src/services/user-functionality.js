const User = require('../entities/models/user');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate({ path: 'properties' }).select('-password');
            return res.status(200).json({
                success: true,
                data: {
                    users
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    },
    updateUser: async (req, res) => {
        const { id, marked } = req.body;
        try {
            await User.findByIdAndUpdate(id, { marked });
            let user = await User.findById(id).populate({ path: 'properties' });
            user = user.toObject();
            delete user.password;
            return res.status(200).json({
                success: true,
                data: {
                    user
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: 'something failed'})
        }
    }
}