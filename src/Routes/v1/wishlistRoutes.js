const express = require('express');
const router = express.Router();
const wishlistController = require('../../Controller/wishlistController');

router.post('/create-wishlist', wishlistController.addToWishlist);     
router.post('/remove-wishlist/:id', wishlistController.removeFromWishlist);
router.get('/get-wishlist/:userId', wishlistController.getWishlist);

module.exports = router;