const Product = require('../models/Product');
const Favorite = require('../models/favorites');

exports.addToFavorites = async (req, res) => {
    try {
        const product = await Product.findById(req.body.product_id);
        console.log(product);
        const favorite = new Favorite();

        //add the function to check if the product is already existed in the favorite data

        favorite.product_id = product._id;
        favorite.product_name = product.product_name;
        favorite.save();
        console.log('favorite', favorite);

        if (!favorite) {
            return res
                .status(404)
                .json({ message: 'Favorite Product is not found' });
        }

        return res.status(200).json({
            message: favorite,
        });
    } catch (error) {
        console.log('catchError', error);
    }
};

exports.getAllFavoriteProducts = (req, res) => {};
