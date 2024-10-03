const express = require('express');
const cartController = require('../../Controller/cartController');
const router = express.Router();

// Add item to cart
router.post('/add', cartController.addItem);

// Remove item from cart
router.post('/remove/:id', cartController.removeItem);

// Delete item from cart
router.post('/delete/:productId', cartController.deleteItem);

// Apply coupon code
router.post('/apply-coupon', cartController.applyCoupon);

// Get cart items
router.get('/', cartController.getCartItems);

module.exports = router;
