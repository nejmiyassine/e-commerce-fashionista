require('dotenv').config();
const express = require('express');
const app = express();

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
const categoryRoutes = require('./routes/categoryRoutes.js');

connectDb();
app.use(express.json());


app.use('/v1/categories', categoryRoutes )


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
