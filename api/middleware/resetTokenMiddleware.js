const { isValidObjectId } = require('mongoose');
const Customer = require('../models/Customers');
const Seller = require('../models/Seller');
const ResetToken = require('../models/ResetToken');

exports.isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;
    const { userType } = req.body;

    if (!token || !id) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid user!' });
    }

    const userModel = userType === 'Customer' ? Customer : Seller;

    try {
        const user = await userModel.findById(id);

        if (!user)
            return res.status(400).json({ message: `${userType} not found!` });

        const resetToken = await ResetToken.findOne({ owner: user._id });
        if (!resetToken)
            return res.status(404).json({ message: 'Reset Token not found!' });

        const isValid = await resetToken.compareToken(token);
        if (!isValid)
            return res.status(403).json({ message: 'Reset Token is invalid!' });

        req.user = user;
        next();
    } catch (error) {
        console.log('middleware: ', error);
        res.status(500).json({ message: error.message });
    }
};
