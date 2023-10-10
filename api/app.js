require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

// ------ Middlewares ------
require('./middleware/passport');
connectDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

// Routes
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/v1/user', userRoutes);
app.use('/v1', protectedRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
