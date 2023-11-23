const express = require('express');
const router = express.Router();
const {addToFavorites , getFavoritesProductsById , getAllFavoritesProducts , deleteFavoritesProducts} = require('../controllers/favoritesController')

router.get('/' , getAllFavoritesProducts)
router.post('/addToFavorites' , addToFavorites)
router.get('/:favoriteID' , getFavoritesProductsById);
router.delete('/:favoriteID' , deleteFavoritesProducts)


module.exports = router;