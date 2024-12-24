// controllers/wishlistController.js

const { WishlistItem } = require("../Model");

exports.addToWishlist = async (req, res) => {
    try {
        const { id, title, image01, price } = req.body;
        const newItem = new WishlistItem({ id, title, image01, price });
        await newItem.save();
        res.status(201).json({ message: 'Item added to wishlist', item: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Could not add item to wishlist' });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await WishlistItem.findOneAndDelete({ id });
        res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (error) {
        res.status(500).json({ error: 'Could not remove item from wishlist' });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const items = await WishlistItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlist items' });
    }
};
