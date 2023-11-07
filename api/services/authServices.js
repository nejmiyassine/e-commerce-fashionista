const { genSalt, hash } = require('bcrypt');
const passport = require('passport');
const { isValidObjectId } = require('mongoose');

const JwtSecretKey = require('../config/env').JwtSecretKey;
const jwtHelper = require('../helpers/issueJwt');
const {
    generateOtp,
    mailTransport,
    generateEmailTemplate,
} = require('../helpers/mail');

const VerificationToken = require('../models/VerificationToken');
const ResetToken = require('../models/ResetToken');
const Customer = require('../models/Customers');
const Seller = require('../models/Seller');

const authRegister = async (req, res, model, userRole) => {
    const { firstName, lastName, userName, email, password } = req.body;

    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const exists = await model.findOne({ email });

        if (exists) {
            return res.status(400).json({
                error: 'Email is already existed',
            });
        }

        const user = await model.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });

        if (userName) {
            user.username = userName;
        }

        const OTP = generateOtp();
        const verificationToken = new VerificationToken({
            owner: user._id,
            userRole,
            token: OTP,
        });

        await verificationToken.save();
        await user.save();

        mailTransport().sendMail({
            from: '',
            to: user.email,
            subject: 'Verify your email account',
            html: generateEmailTemplate(OTP),
        });

        return res
            .status(201)
            .json({ message: 'user created successfully', user });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const authLogin = async (req, res, next, local) => {
    passport.authenticate(local, { session: false }, (error, user) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const jwt = jwtHelper.issueJwt(user, JwtSecretKey);
        const { token, expires } = jwt;

        res.status(200).json({ user, token, expiresIn: expires });
    })(req, res, next, local);
};

const verifyEmail = async (req, res) => {
    const { userId, otp, userType } = req.body;

    if (!userId || !otp.trim() || !userType) {
        return res.status(401).json({
            message: 'Invalid request, missing parameters!',
        });
    }

    if (!isValidObjectId(userId)) {
        return res.status(401).json({
            message: 'Invalid user id!',
        });
    }

    const userModel = userType === 'Customer' ? Customer : Seller;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found!',
            });
        }

        if (user.valid_account) {
            return res.status(200).json({
                message: 'This account is already verified!',
                user,
            });
        }

        const token = await VerificationToken.findOne({ owner: userId });

        if (!token) {
            return res.status(404).json({ message: 'Sorry! Token not found.' });
        }

        const isMatched = await token.compareToken(otp);

        if (!isMatched) {
            return res.status(403).json({
                message: 'Please provide a valid token!',
            });
        }

        user.valid_account = true;

        await VerificationToken.findByIdAndDelete(token._id);
        await user.save();

        res.status(200).json({
            message: 'Account verified successfully',
            user,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    const { email, userType } = req.body;

    if (!email || !userType)
        return res
            .status(401)
            .json({ message: 'Invalid request, missing parameters' });

    const userModel = userType === 'Customer' ? Customer : Seller;

    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: `${userType} not found!` });

        const resetToken = await ResetToken.findOne({ owner: user._id });
        if (resetToken) {
            return res.status(404).json({
                message: 'Only after hour you can request for another token!',
            });
        }
    } catch (error) {}
};

module.exports = { authRegister, authLogin, verifyEmail, forgotPassword };
