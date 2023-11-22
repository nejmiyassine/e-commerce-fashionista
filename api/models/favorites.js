const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    // customer_id : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Customer',
    //     required: true,
    // },

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    product_name : {
        type:String
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
