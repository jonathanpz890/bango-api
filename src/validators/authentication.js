const { body } = require('express-validator');

module.exports = {
    createUser: [
        body('name').isString(),
        body('phone').isString().isLength({min: 10, max: 10}),
        body('password').isString().isLength({min: 6, max: 18}),
    ],
    login: [
        body('phone').isString().isLength({min: 10, max: 10}),
        body('password').isString().isLength({min: 6, max: 6}),
    ],
    updateUser: [
        body('id').isMongoId(),
        body('marked').isArray()
    ]
}