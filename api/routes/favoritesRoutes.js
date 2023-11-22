const express = require('express');
const router = express.Router();
const {addToFavorites , getAllFavoritesProducts} = require('../controllers/favoritesController')

router.post('/addToFavorites' , addToFavorites)
// router.get('/' , getAllFavoritesProducts);


module.exports = router;