const Orders = require('../models/Orders');

// Post Orders
const createOrdersController = async (req, res) => {
    try {
        const newOrder = new Orders({
            customer_id: req.user._id,
            order_items: req.body.order_items,
            order_date: new Date(),
            cart_total_price: req.body.cart_total_price,
            status: 'open',
        });

        const createdOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order created successfully',
            createdOrder: createdOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Put Orders
const updateOrdersController = async (req, res) => {
    const orderId = req.params.id;
    try {
        // if (!req.user.emailValidated) {
        if (!orderId) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = await Orders.findByIdAndUpdate(orderId, req.body, {
            new: true,
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(204).json({
            message: 'Order updated successfully',
            order,
        });
        // } else {
        //     return res.status(403).json({ error: 'Not authorized' });
        // }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Get Orders by ID
const getOrderByIdController = async (req, res) => {
    // if (!req.user.emailValidated) {
    //     return res.status(403).json({ error: 'Forbidden' });
    // }

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
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

//Get All Orders

const getAllOrdersController = async (req, res) => {
    try {
        // if (!req.user.emailValidated) {
        //     return res.status(403).json({ error: 'Forbidden' });
        // }

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orders = await Orders.populate('customer_id')
            .limit(limit)
            .skip(skip);

        if (orders.length === 0) {
            return res.status(200).send([]);
        }

        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
};
