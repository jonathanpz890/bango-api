const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String, 
            required: true
        },
        attraction: {
            type: String,
            required: true,
            default: 'Men'
        },
        properties: [{
            type: mongoose.ObjectId,
            required: true,
            ref: 'Property'
        }],
        marked: [{
            type: Number,
            required: false
        }]
    }
)

module.exports = mongoose.model('User', UserSchema);