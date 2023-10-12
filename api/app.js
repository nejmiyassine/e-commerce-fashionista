require('dotenv').config();
const express = require('express');
const cookieParser =require('cookie-parser')
const app = express();


const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;


connectDb();



//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

const authRoutes = require('./routes/customerRoutes')

//register
app.use('/v1/auth' , authRoutes)




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
