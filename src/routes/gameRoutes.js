const router = require('express').Router();
const Service = require('../services/game-functionality');
const Validator = require('../validators/game');
const Middleware = require('../middleware/middleware');


router.post(
    '/',
    Validator.createGame,
    Middleware.validateRequestSchema,
    Service.createGame
)
router.get(
    '/:id',
    Service.getGame
)
router.post(
    '/user-join-game',
    Validator.userJoinGame,
    Middleware.validateRequestSchema,
    Service.userJoinGame
)

module.exports = router;