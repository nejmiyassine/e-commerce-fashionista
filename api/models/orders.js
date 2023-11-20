const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
        description: 'The customer ID',
    },
    order_items: {
        type: [String],
        description: 'The order list',
    },
    order_date: {
        type: Date,
        description: 'The order date',
    },
    cart_total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        description: 'The order status',
    },
});

module.exports = mongoose.model('Orders', ordersSchema);
