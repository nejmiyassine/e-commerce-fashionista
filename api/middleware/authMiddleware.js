const passport = require('passport');

const isAdminOrManager = passport.authenticate('user', { session: false });
const isCustomer = passport.authenticate('customer', { session: false });

module.exports = { isAdminOrManager, isCustomer };
