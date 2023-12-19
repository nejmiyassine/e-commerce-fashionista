const customerModel = require('../models/Customers');
const jwt = require('jsonwebtoken');

const isAuthentificated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res
                .status(401)
                .json({ message: 'please login to access the data' });
        }
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await customerModel.findById(verify.id);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'unauthorized' });
    }
};
module.exports = isAuthentificated;
