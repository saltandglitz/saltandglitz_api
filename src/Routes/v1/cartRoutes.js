const express = require('express');
const cartController = require('../../Controller/cartController');
const router = express.Router();

router.post('/add', cartController.addItem);
router.post('/remove/:id', cartController.removeItem);
router.post('/delete/:id', cartController.deleteItem);
router.post('/apply-coupon', cartController.applyCoupon);
router.get('/', cartController.getCartItems);

module.exports = router;
