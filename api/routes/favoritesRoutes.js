const express = require('express');
const router = express.Router();

const {
    addToFavorites,
    getFavoritesProductsById,
    getAllFavoritesProducts,
    deleteFavoritesProducts,
} = require('../controllers/favoritesController');

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const { restrictToCustomer } = require('../middleware/restrictMiddleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictToCustomer, getAllFavoritesProducts);
router.post('/addToFavorites', addToFavorites);
router.get('/:favoriteID', getFavoritesProductsById);
router.delete('/:favoriteID', deleteFavoritesProducts);

module.exports = router;
