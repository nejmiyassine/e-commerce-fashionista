// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const JwtSecretKey = require('../config/env').JwtSecretKey;

// const User = require('../models/User');
// const Customer = require('../models/Customers');
// const Seller = require('../models/Seller');

// const customFields = {
//     usernameField: 'email',
//     passwordField: 'password',
// };

// const verifyCbModel = async (email, password, done, model) => {
//     try {
//         const user = await model.findOne({ email });

//         if (!user) {
//             return done(null, false, { message: 'invalid credentials' });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);

//         if (!isValidPassword) {
//             return done(null, false, { message: 'invalid credentials' });
//         }

//         return done(null, user);
//     } catch (error) {
//         done(error);
//     }
// };

// const verifyCbCustomer = async (email, password, done) => {
//     await verifyCbModel(email, password, done, Customer);
// };

// const customerStrategy = new LocalStrategy(customFields, verifyCbCustomer);

// passport.use('local-customer', customerStrategy);

// const verifyCbSeller = async (email, password, done) => {
//     await verifyCbModel(email, password, done, Seller);
// };

// const sellerStrategy = new LocalStrategy(customFields, verifyCbSeller);

// passport.use('local-seller', sellerStrategy);

// const jwtOpts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: JwtSecretKey,
// };

// const jwtVerifyModel = async (model, jwtPayload, done) => {
//     try {
//         const user = await model.findById(jwtPayload.userId);
//         console.log('passportUser : ', user);
//         console.log('passportJwtPayload : ', jwtPayload);
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     } catch (error) {
//         return done(err, false);
//     }
// };

// const jwtVerifyCallbackUser = async (jwtPayload, done) => {
//     jwtVerifyModel(User, jwtPayload, done);
// };
// const jwtVerifyCallbackCustomer = async (jwtPayload, done) => {
//     jwtVerifyModel(Customer, jwtPayload, done);
// };
// const jwtVerifyCallbackSeller = async (jwtPayload, done) => {
//     jwtVerifyModel(Seller, jwtPayload, done);
// };

// const jwtStrategyUser = new JwtStrategy(jwtOpts, jwtVerifyCallbackUser);
// const jwtStrategyCustomer = new JwtStrategy(jwtOpts, jwtVerifyCallbackCustomer);
// const jwtStrategySeller = new JwtStrategy(jwtOpts, jwtVerifyCallbackSeller);

// passport.use('user', jwtStrategyUser);
// passport.use('customer', jwtStrategyCustomer);
// passport.use('seller', jwtStrategySeller);

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtSecretKey = require('../config/env').JwtSecretKey;

const User = require('../models/User');
const Customer = require('../models/Customers');
const Seller = require('../models/Seller');

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

// Common verification callback function
const verifyCbModel = async (email, password, done, model) => {
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

// Local strategies
const createLocalStrategy = (model, name) => {
    const verifyCallback = async (email, password, done) => {
        await verifyCbModel(email, password, done, model);
    };
    passport.use(name, new LocalStrategy(customFields, verifyCallback));
};

createLocalStrategy(Customer, 'local-customer');
createLocalStrategy(Seller, 'local-seller');

// JWT strategies
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JwtSecretKey,
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
