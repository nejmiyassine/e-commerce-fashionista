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

shoppingCartSchema.methods.removeItemFromCart = async function (productId) {
    const cartItemIndex = this.items.findIndex((item) =>
        item.product.equals(productId)
    );

    if (cartItemIndex !== -1) {
        const { quantity, product } = this.items[cartItemIndex];

        // Decrease the cartQuantity of the associated product
        await Product.findByIdAndUpdate(product, {
            $inc: { cartQuantity: -quantity },
        });

        // Remove the item from the cart
        this.items.splice(cartItemIndex, 1);
    }
};

shoppingCartSchema.methods.decreaseQuantity = async function (
    productId,
    quantity
) {
    const cartItem = this.items.find((item) => item.product.equals(productId));

    if (cartItem) {
        if (cartItem.quantity > quantity) {
            cartItem.quantity -= quantity;
        } else {
            // If quantity becomes 0 or negative, remove the item from the cart
            await this.removeFromCart(productId);
        }

        // Decrease the cartQuantity of the associated product
        await Product.findByIdAndUpdate(cartItem.product, {
            $inc: { cartQuantity: -quantity },
        });
    }
};

shoppingCartSchema.methods.getAllCartItems = function () {
    return this.items;
};

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;
