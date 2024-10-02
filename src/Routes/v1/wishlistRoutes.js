const express = require('express');
const router = express.Router();
const wishlistController = require('../../Controller/wishlistController');

router.post('/create-wishlist', wishlistController.addToWishlist);     
router.delete('/remove-wishlist:id', wishlistController.removeFromWishlist);
router.get('/get-wishlist', wishlistController.getWishlist);

module.exports = router;
