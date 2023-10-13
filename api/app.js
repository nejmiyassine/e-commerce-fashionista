require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport');
const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
require('./middleware/passport');

const authRoutes = require('./routes/customerRoutes');

app.use('/v1', authRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
