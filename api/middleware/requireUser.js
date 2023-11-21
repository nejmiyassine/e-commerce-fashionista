const CustomError = require('../helpers/customError');

const requireUser = (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return next(
                new CustomError('Invalid token or session has expired', 401)
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = requireUser;
