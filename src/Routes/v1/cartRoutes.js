const express = require('express');
const router = express.Router();
const {Cart_controller} = require('../../Controller');

// Add to cart
router.post('/add', Cart_controller.addToCart);

// Remove item from cart
router.post('/remove/:productId', Cart_controller.removeFromCart);

// Delete item from cart
router.post('/delete/:productId', Cart_controller.deleteFromCart);

module.exports = router;
