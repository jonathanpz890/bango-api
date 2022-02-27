const router = require('express').Router();
const authenticationRoutes = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');
const usersRoutes = require('./usersRoutes');
const Property = require('../entities/models/property')

router.use('/', authenticationRoutes);
router.use('/user', userRoutes);

module.exports = router;