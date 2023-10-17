const passport = require('passport');

const isAdminOrManager = passport.authenticate('jwt', { session: false });

module.exports = isAdminOrManager;
