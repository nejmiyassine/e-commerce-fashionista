require('dotenv').config();
const express = require('express');
const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;


const app = express();


connectDb();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const authRoutes = require('./routes/customerRoutes')

app.use('/v1/auth' , authRoutes)












app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
