const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtSecretKey = require('../config/env').JwtSecretKey;

const User = require('../models/User');
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

        const isValidPassword = await bcrypt.compare(
            password,
            customer.password
        );

        if (!isValidPassword) {
            return done(null, false, { message: 'invalid credentials' });
        }

        return done(null, customer);
    } catch (error) {
        done(error);
    }
};

const strategy = new LocalStrategy(customFields, verifyCb);

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JwtSecretKey,
};

const jwtVerifyModel = async (model, jwtPayload, done) => {
    try {
        
        const user = await model.findById(jwtPayload.userId);
console.log("passportUser : " , user)
console.log("passportJwtPayload : " , jwtPayload)
        if (user) {
             
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(err, false);
    }
};

const jwtVerifyCallbackUser = async (jwtPayload, done) => {
    jwtVerifyModel(User, jwtPayload, done);
};
const jwtVerifyCallbackCustomer = async (jwtPayload, done) => {
    jwtVerifyModel(Customer, jwtPayload, done);
};

const jwtStrategyUser = new JwtStrategy(jwtOpts, jwtVerifyCallbackUser);
const jwtStrategyCustomer = new JwtStrategy(jwtOpts, jwtVerifyCallbackCustomer);

passport.use(strategy);
passport.use('user', jwtStrategyUser);
passport.use('customer', jwtStrategyCustomer);
