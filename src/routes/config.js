const router = require('express').Router();
const authenticationRoutes = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/', authenticationRoutes);

// router.use('/user', userRoutes);
// router.use('/users', usersRoutes);

module.exports = router;