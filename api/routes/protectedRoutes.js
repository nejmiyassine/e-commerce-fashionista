const express = require('express');
const router = express.Router();
const passport = require('passport');

const isAuthenticated = passport.authenticate('jwt', { session: false });

router.get('/admin', isAuthenticated, (req, res) => {
    if (req.user.role === 'admin') {
        return res.status(200).json({ message: 'Admin access granted' });
    }
    res.status(403).json({ message: 'Permission denied' });
});

module.exports = router;
