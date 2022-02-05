const { body } = require('express-validator');

module.exports = {
    createUser: [
        body('phone').isString().isLength({min: 10, max: 10}),
        body('passcode').isString().isLength({min: 6, max: 6}),
    ],
    login: [
        body('phone').isString().isLength({min: 10, max: 10}),
        body('passcode').isString().isLength({min: 6, max: 6}),
    ]
}