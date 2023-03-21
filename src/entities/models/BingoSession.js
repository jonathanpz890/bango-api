const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const BingoSessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: false
        },
        properties: [{
            type: Object,
            required: true,
            _id: {
                type: mongoose.ObjectId,
                required: true
            }, 
            title: {
                type: String,
                required: true
            }
        }],
        // color: {
        //     type: String,
        //     required: false,
        //     default: '#000000'
        // },
        users: [{
            type: mongoose.ObjectId,
            required: false,
            ref: 'User',

        }]
    }
)
module.exports = mongoose.model('BingoSession', BingoSessionSchema);