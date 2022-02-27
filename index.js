require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseURI = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
const APIRoutes = require('./src/routes/config.js')
// const passport = require('passport');
// const initializePassport = require('./src/passport-config');

// initializePassport(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
	origin: process.env.ALLOWED_ORIGINS.split(','),
	methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	credentials: true,
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, api-key, access-control-allow-Headers'
}));
app.use('/', APIRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(mongooseURI)
        app.listen(process.env.PORT, () => {
            console.log('App running.')
        })
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

startServer();