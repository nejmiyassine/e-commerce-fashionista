const Product = require('../models/Product');
const Favorite = require('../models/favorites');
const Customer = require('../models/Customers');

exports.addToFavorites = async (req, res) => {
    const { productId } = req.body;
    console.log(productId);
    try {
        const customerId = res.locals.user._id;

        const product = await Product.findById(productId);
        console.log('product', product);
        const customer = await Customer.findById(customerId);
        console.log('customer', customer);

        const exists = await Favorite.findOne({
            customer: customerId,
            product: productId,
        });
        console.log('exists', exists);
        if (exists) {
            return res.status(200).json({ message: 'it is already added to favorite' });
        }

        const favorite = await Favorite.create({
            product: product._id,
            customer: customer._id,
        });
        return res.status(200).json(favorite);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getFavoritesProductsById = async (req, res) => {
    try {
        const id = req.params.favoriteID;
        const favorite = await Favorite.findById(id).populate('product', {
            product_name: 1,
            product_images: 1,
            short_description: 1,
            long_description: 1,
            price: 1,
            quantity: 1,
            discount_price: 1,
            options: 1,
            sku: 1,
        });

        if (!favorite) {
            return res
                .status(200)
                .json({ message: 'favorite product not found' });
        }
        return res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllFavoritesProducts = async (req, res) => {
    try {
        const customerId = res.locals.user._id;

        const favorite = await Favorite.find({ customer: customerId }).populate(
            'product',
            { product_name: 1, product_images: 1 }
        );
        if (!favorite) {
            // res.status(404).json({ message: 'favorite products not found' });
        }
        return res.status(200).json(favorite);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteFavoritesProducts = async (req, res) => {
    try {
        const id = req.params.favoriteID;
        const favorite = await Favorite.findByIdAndDelete(id);

        if (!favorite) {
            return res
                .status(404)
                .json({ message: 'no favorite product to delete' });
        }

        return res
            .status(200)
            .json({ message: 'favorite product is deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
