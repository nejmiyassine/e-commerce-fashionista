const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({});

const User = mongoose.model('User', userSchema);
