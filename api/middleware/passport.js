const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customers');


const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

const verifyCb = async (email, password, done) => {
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return done(null, false, { message: 'invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, customer.password);
        if (!isValidPassword) {
            return done(null, false, { message: 'invalid credentials' });
        }
        return done(null , customer) 
    } catch (error) {
        done(error);
    }
};

const strategy = new LocalStrategy(customFields , verifyCb )

passport.use (strategy)