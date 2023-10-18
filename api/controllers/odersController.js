const Orders = require('../models/Orders');

// Post Orders
const createOrdersController = async (req, res) => {
    if (!req.user.emailValidated) {
        return res.status(403).json({ error: 'Email not validated' });
    }
    const newOrder = new Orders({
        customer_id: req.user._id,
        order_items: req.body.order_items,
        order_date: new Date(),
        cart_total_price: req.body.cart_total_price,
        status: 'open',
    });

    newOrder
        .save()
        .then((order) => {
            res.status(201).json(order);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};
module.exports = createOrdersController;

//Put Orders
const updateOrdersController = async (req, res) => {
    if (!req.user.emailValidated) {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(404).json({ error: 'Order not found' });
        }

        Orders.findByIdAndUpdate(orderId, req.body, { new: true })
            .then((order) => {
                if (!order) {
                    return res.status(404).json({ error: 'Order not found' });
                }
                res.status(204).send();
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    } else {
        res.status(403).json({ error: 'Not authorized' });
    }
};
module.exports = updateOrdersController;

//Get Orders by ID
const getOrdersController = async (req, res) => {
    if (!req.user.emailValidated) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    try {
        const { id } = req.params;
        await Orders.findById(id);
        res.status(200).send({
            success: true,
            message: 'Order found successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: 'Error finding Order',
            error,
        });
    }
};

module.exports = getOrdersController;

//Get All Orders

const getAllOrdersController = async (req, res) => {
    try {
        if (!req.user.emailValidated) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orders = await Orders.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer_id',
                    foreignField: '_id',
                    as: 'customerInfo',
                },
            },
            {
                $unwind: '$customerInfo',
            },
            {
                $group: {
                    _id: '$_id',
                    count: { $sum: 1 },
                    itemsTotal: { $sum: '$cart_total_price' },
                    customer: {
                        $first: '$customerInfo',
                    },
                },
            },
        ])
            .limit(limit)
            .skip(skip);

        if (orders.length === 0) {
            return res.status(200).send([]);
        }

        res.status(200).send({
            data: orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error listing all the orders',
            error,
        });
    }
};

module.exports = getAllOrdersController;
