const Orders = require('../models/Orders');

// Create a new order
const createOrdersController = async (req, res) => {
    const customer_id = res.locals.user._id;
    const { order_items, cart_total_price } = req.body;

    try {
        if (!order_items || !cart_total_price) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        const newOrder = await Orders.create({
            customer_id,
            order_items,
            order_date: new Date(),
            cart_total_price,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Order created successfully',
            newOrder,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error creating order',
        });
    }
};

// Update an order by ID
const updateOrdersController = async (req, res) => {
    const orderId = req.params.id;
    try {
        if (!orderId) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = await Orders.findByIdAndUpdate(orderId, req.body, {
            new: true,
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get an order by ID
const getOrderByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a list of all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Orders.find().populate('customer_id');

        if (orders.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getCustomerOrders = async (req, res) => {
    const customerId = res.locals.user._id;

    try {
        const orders = await Orders.find({ customer_id: customerId }).populate(
            'customer_id'
        );

        if (orders.length === 0) {
            return res
                .status(200)
                .json({ message: 'No orders found for the customer' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
    getCustomerOrders,
};
