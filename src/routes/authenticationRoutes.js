const router = require('express').Router();
const Validator = require('../validators/authentication');
const Service = require('../services/authentication-functionality');
const Middleware = require('../middleware/middleware');

router.post('/register', Validator.createUser, Middleware.validateRequestSchema,  Service.createUser);
router.post('/login', Validator.login, Middleware.validateRequestSchema,  Service.login);


module.exports = router;