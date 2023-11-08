require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
// const cors = require('cors');

const indexRoutes = require('./routes/index.routes');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

// ------ Middlewares ------
connectDb();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// Passport
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport');


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
