require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseURI = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`
const APIRoutes = require('./src/routes/config.js')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const User = require('./src/entities/models/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
	origin: process.env.ALLOWED_ORIGINS.split(','),
	methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	credentials: true,
	// allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, api-key, access-control-allow-Headers'
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, X-Access-Token, Accept'

}));
app.use(cookieParser())
app.use(session({
    secret: 'voldemort',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV !== 'dev',
        httpOnly: process.env.NODE_ENV !== 'dev',
        maxAge: 36000000000,
        sameSite: 'none'
    },
    store: MongoStore.create({
        mongoUrl: mongooseURI
    })
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'phone'}, (phone, password, done) => {
    User.findOne({ phone }, {}, {populate: 'properties'}, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false, { message: 'Incorrect phone number' });
        
        bcrypt.compare(password, user.password, (error, res) => {
            if (error) return done(error)
            if (!res) return done(null, false, { message: 'Incorrect password' });
            return done(null, user);
        })
    })
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, {}, { populate: 'properties' }, (err, user) => {
        done(err, user);
    });
});

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