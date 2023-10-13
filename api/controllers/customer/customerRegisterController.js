const customerModel = require('../../models/Customers');
const {genSalt , hash } = require('bcryptjs');


const registerCustomer = async(req, res) => {
    try {
        const {firstName , lastName, email , password} = req.body;
        const salt = await genSalt(10);
        const hashedPassword = await hash(password , salt);

        if(!firstName) {
            return res.status(400)
            .json({
                error: 'FirstName is required'
            })
        };
        
        if(!lastName) {
            return res.status(400)
            .json({
                error: 'LastName is required'
            })
        }

        if(!password || password.length < 6) {
            return res.status(400)
            .json({
                error: 'Password is requred and must be at least 6 charachters long '
            })
        };

const exists = await customerModel.findOne({email});
if(exists) {
    return res.status(400)
    .json({
        error: 'Email is already existed'
    })
}  
const customer = await customerModel.create({
    first_name: firstName ,
    last_name: lastName ,
    email,
    password: hashedPassword,
})     
        return res.status(201)
        .send("customer created successfully")
        .json({customer})


    } catch ( err) {
        return res.status(400)
    .send("customer can't created")
        .json({message: err.message})
    }
}

module.exports = {registerCustomer}