const isAdminOrManager = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = req.user;
    if (user.role === 'admin' || user.role === 'manager') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
