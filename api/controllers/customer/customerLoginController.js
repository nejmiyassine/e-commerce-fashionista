const Customer = require('../../models/Customers')
const bcrypt = require('bcryptjs');
const tokenSecretKey = require('../../config/env').tokenSecretKey
const jwt = require('jsonwebtoken');


const loginCustomer = async(req, res) => {
    const {email , password} = req.body;
    try {
    const customer = await Customer.findOne({email});
    if(!customer) {
        return res
        .status(401)
        .json({message: "invalid credentials"});
    }

    const isValidPassword = await bcrypt.compare(password , customer.password);
    if(!isValidPassword) {
        return res
        .status(401)
        .json({message: "invalid credentials"});
    }
        const token = jwt.sign({_id: customer._id} , tokenSecretKey, {expiresIn: "1d"});
        res.cookie('token' , token);     
       res.status(200).json({token: token})

 } catch (error) {
    res.status(500).json({ msg: error.message });
    }
         };

         

module.exports = {loginCustomer}


