require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

// ------ Middlewares ------
connectDb();
app.use(express.json());
    // Session
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
