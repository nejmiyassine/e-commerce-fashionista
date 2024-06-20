require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
const BASE_URL = require('./config/env').BASE_URL;

const indexRoutes = require('./routes/index.routes');

const prodOrigins = [BASE_URL];
const devOrigin = 'http://localhost:5173';
const allowedOrigins =
    process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin;

const corsOptions = {
    origin: (origin, cb) => {
        if (allowedOrigins.includes(origin)) {
            console.log(origin, allowedOrigins);
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

connectDb();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// require('./middleware/passport');

app.get('/', async (req, res) => res.send('Hello World!'));
app.use('/v1', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
