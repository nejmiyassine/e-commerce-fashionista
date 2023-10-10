const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtSecretKey = require('../config/env').JwtSecretKey;

const User = require('../models/User');

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JwtSecretKey,
};

const jwtVerifyCallback = async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload._id);
        console.log('jwtPayload: ', jwtPayload);
        console.log('user: ', user);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(err, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOpts, jwtVerifyCallback);

passport.use(jwtStrategy);
