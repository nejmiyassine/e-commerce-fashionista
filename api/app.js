require('dotenv').config();
const express = require('express');
const app = express();

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

connectDb();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
