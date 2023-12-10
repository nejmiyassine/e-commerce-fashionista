const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    card: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: 'payed',
    },
    billing_details: { type: Object, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
