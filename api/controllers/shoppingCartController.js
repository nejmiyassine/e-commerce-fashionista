const express = require('express');
const ShoppingCart = require('../models/ShoppingCart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const customerId = res.locals.user._id;

    try {
        let cart = await ShoppingCart.findOne({ customer_id: customerId });

        if (!cart) {
            cart = ShoppingCart.create({ customer_id: customerId, items: [] });
        }

        const cartItem = cart.items.find((item) =>
            item.product.equals(productId)
        );

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await Product.findByIdAndUpdate(productId, {
            $inc: { cartQuantity: quantity },
        });

        await cart.save();

        res.status(200).json({
            success: true,
            cart,
            message: 'Product added to cart successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const customerId = res.locals.user._id;

    try {
        const cart = await ShoppingCart.findOne({ customer_id: customerId });

        if (cart) {
            await cart.removeItemFromCart(productId);

            await cart.save();

            res.status(200).json({
                success: true,
                cart,
                message: 'Product removed from cart successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Shopping cart not found for the user',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.decreaseQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const customerId = res.locals.user._id;

    try {
        const cart = await ShoppingCart.findOne({ customer_id: customerId });

        if (cart) {
            await cart.decreaseQuantity(productId, quantity);

            await cart.save();

            res.status(200).json({
                success: true,
                cart,
                message: 'Quantity decreased successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Shopping cart not found for the user',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.getAllCartItems = async (req, res) => {
    const customerId = res.locals.user._id;

    try {
        const cart = await ShoppingCart.findOne({
            customer_id: customerId,
        }).populate('items.product');

        if (cart) {
            const cartItems = cart.getAllCartItems();
            res.status(200).json({ success: true, cartItems });
        } else {
            res.status(404).json({
                success: false,
                message: 'Shopping cart not found for the user',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
