const bcrypt = require('bcrypt');

const Seller = require('../models/Seller');
const authService = require('../services/authServices');

exports.registerSeller = (req, res) => {
    authService.authRegister(req, res, Seller, 'Seller');
};

exports.loginSeller = (req, res, next) => {
    authService.authLogin(req, res, next, 'local-seller');
};

exports.getAllSellersList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const sort = req.query.sort || 'DESC';
    const sellersPerPage = 10;

    try {
        const sellers = await Seller.find()
            .sort({ username: sort })
            .skip(page * sellersPerPage)
            .limit(sellersPerPage);

        if (!sellers) {
            return res.status(404).json({ message: 'Sellers not found' });
        }

        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSellerById = async (req, res) => {
    const { id } = req.params.id;

    try {
        const seller = await Seller.findOne(id);

        if (!seller) {
            res.status(404).json({ message: 'Seller not Found' });
        }

        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSeller = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, userName, email, password } = req.body;

    try {
        const updatedFields = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email,
            last_update: Date.now(),
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.password = hashedPassword;
        }

        const user = await Seller.findByIdAndUpdate(id, updatedFields, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(201).json({ message: 'Seller updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSellerById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Seller.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'seller not found' });
        }

        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
