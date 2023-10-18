require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

const indexRoutes = require('./routes/index.routes');

// ------ Middlewares ------
connectDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

require('./middleware/passport');

app.use('/v1', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
