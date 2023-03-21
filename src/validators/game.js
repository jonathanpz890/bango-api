const { body } = require('express-validator');

module.exports = {
    userJoinGame: [
        body('id').isMongoId(),
        body('userId').isMongoId()
    ],
    createGame: [
        body('title').isString().isLength({min: 2, max: 50}),
        body('creator').isString().isLength({min: 2, max: 30}),
        body('about').isString().optional(),
        body('properties').isArray({min: 25, max: 100}).withMessage('רשימת ערכים קצרה מדי')
    ]
}