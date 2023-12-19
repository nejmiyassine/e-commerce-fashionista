require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;

const indexRoutes = require('./routes/index.routes');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT,DELETE, PATCH',
    credentials: true,
};

connectDb();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// require('./middleware/passport');

app.use('/v1', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
