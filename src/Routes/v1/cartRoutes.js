const express = require('express');
<<<<<<< HEAD
const cartController = require('../../Controller/cartController');
const router = express.Router();

router.post('/add', cartController.addItem);
router.post('/remove/:id', cartController.removeItem);
router.post('/delete/:id', cartController.deleteItem);
router.post('/apply-coupon', cartController.applyCoupon);
router.get('/', cartController.getCartItems);
=======
const router = express.Router();
const {Cart_controller} = require('../../Controller');

// Add to cart
router.post('/add', Cart_controller.addToCart);

// Remove item from cart
router.post('/remove/:productId', Cart_controller.removeFromCart);

// Delete item from cart
router.post('/delete/:productId', Cart_controller.deleteFromCart);
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8

module.exports = router;
