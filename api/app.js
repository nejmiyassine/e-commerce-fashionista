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
const categoryRoutes = require('./routes/categoryRoutes.js');
const subcategoryRoutes = require('./routes/subcategoryRoutes.js');
const customerRoutes = require('./routes/customerRoutes');

app.use('/v1/users', userRoutes);
app.use('/v1/customers', customerRoutes);
app.use('/v1', protectedRoutes);
app.use('/v1/subcategories', subcategoryRoutes)
app.use('/v1/categories', categoryRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
