const mongoose = require('mongoose');
const db = require('./env').MongoURI;

const connectDb = () => {
    return mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected ....'))
        .catch((err) => console.error(err));
};

module.exports = connectDb;
