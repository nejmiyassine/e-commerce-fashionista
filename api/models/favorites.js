const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
