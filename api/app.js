require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

// ------ Middlewares ------
connectDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport');

// Routes
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/v1/users', userRoutes);
app.use('/v1', protectedRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
