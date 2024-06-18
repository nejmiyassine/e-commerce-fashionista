const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWT_SECRET_KEY = require('../config/env').JWT_SECRET_KEY;

const User = require('../models/User');
const Customer = require('../models/Customers');
const Seller = require('../models/Seller');

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

// Local strategies
const createLocalStrategy = (model, name) => {
    const verifyCallback = async (email, password, done) => {
        try {
            const user = await model.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
    };
    passport.use(name, new LocalStrategy(customFields, verifyCallback));
};

createLocalStrategy(Customer, 'local-customer');
createLocalStrategy(Seller, 'local-seller');

// JWT strategies
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY,
};

const createJwtStrategy = (model, name) => {
    const verifyCallback = async (jwtPayload, done) => {
        try {
            const user = await model.findById(jwtPayload.userId);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    };
    passport.use(name, new JwtStrategy(jwtOpts, verifyCallback));
};

createJwtStrategy(User, 'user');
createJwtStrategy(Customer, 'customer');
createJwtStrategy(Seller, 'seller');
