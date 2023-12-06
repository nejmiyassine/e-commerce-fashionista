const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product');

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const shoppingCartSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    items: [cartItemSchema],
});

shoppingCartSchema.methods.removeItemFromCart = async function (
    productId,
    quantity
) {
    const cartItem = this.items.find((item) => item.product.equals(productId));

    if (cartItem) {
        if (cartItem.quantity > quantity) {
            cartItem.quantity -= quantity;
        } else {
            this.items = this.items.filter(
                (item) => !item.product.equals(productId)
            );
        }

        await Product.findByIdAndUpdate(productId, {
            $inc: { cartQuantity: -quantity },
        });
    }
};

shoppingCartSchema.methods.getAllCartItems = function () {
    return this.items;
};

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;
