const express = require("express");

// const loginRoutes = require("./Login_routes");
// const signupRoutes = require("./Signup_routes");
const shippingRoutes = require("./Shipping_routes");
const adminRoutes = require("./admin_routes");
const cartsRoutes = require('./cart');
const wishlistRoutes = require('./wishlistRoutes');
const productRoutes = require('./Product');
const uploadRoutes = require('./upload_routes');

const router = express();

// router.use("/login", loginRoutes);
// router.use("/signup", signupRoutes);
router.use("/shipping", shippingRoutes);
router.use("/admin", adminRoutes);
router.use('/carts', cartsRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/product', productRoutes);
router.use('/upload', uploadRoutes);


module.exports = router;
