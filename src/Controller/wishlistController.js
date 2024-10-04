const WishlistItem = require('../Model/wishlistModel');

exports.addToWishlist = async (req, res) => {
    try {
        const { id, title, image01, price } = req.body;

        // console.log('Received item:', { id, title, image01, price });

        const newItem = new WishlistItem({ id, title, image01, price });
        await newItem.save();

        // console.log('Item saved to database:', newItem);

        res.status(201).json({ message: 'Item added to wishlist', item: newItem });
    } catch (error) {
        // console.error('Error saving to database:', error);
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
        const { userId } = req.params; // Get userId from request parameters
        const items = await WishlistItem.find({ userId }); // Find wishlist items for the specific user
        if (!items.length) {
            return res.status(404).json({ message: 'No wishlist items found for this user' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlist items' });
    }
};

