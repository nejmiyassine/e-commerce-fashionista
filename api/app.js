require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
const BASE_URL = require('./config/env').BASE_URL;

const indexRoutes = require('./routes/index.routes');

const corsOptions = {
    origin: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': BASE_URL,
    },
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
