const mongoose = require('mongoose');
const BingoSession = require('../entities/models/BingoSession');
const User = require('../entities/models/user');

module.exports = {
    createGame: async (req, res) => {
        try {
            const { title, creator, about, properties: tempProps } = req.body;
            const properties = tempProps.map(prop => ({
                ...prop,
                _id: new mongoose.Types.ObjectId
            }))
            const game = new BingoSession({ title, creator, about, properties})
            game.save();
            res.send({
                game
            });
        } catch (error) {
            console.log(error)
            res.sendStatus(400);
        }
    },
    getGame: async (req, res) => {
        const { populateUsers } = req.query;
        try {
            const game = await BingoSession.findById(req.params.id).populate(populateUsers ? 'users' : '')
            return res.status(200).json({
                success: true,
                game
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    },
    userJoinGame: async (req, res) => {
        try {
            const { id, userId} = req.body;
            const game = await BingoSession.findById(id);
            let properties = game.properties.map(prop => ({
                ...prop,
                marked: false
            }));
            properties = properties.sort(() => Math.random() - 0.5).slice(0, 25);
            if (!game.users.includes(userId)) {
                const game = await BingoSession.findByIdAndUpdate(
                    id, 
                    {$push: {users: userId}},
                    { new: true }
                )
                const user = await User.findByIdAndUpdate(userId, {
                    $push: {
                        games: {_id: id, properties}
                    }, 
                }, {
                    new: true
                })
                return res.send({
                    user,
                    game
                })
            }
            res.sendStatus(200);
        } catch(error) {
            console.log(error)
        }
    },
}