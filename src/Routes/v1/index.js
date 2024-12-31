const express = require("express");

// const loginRoutes = require("./Login_routes");
// const signupRoutes = require("./Signup_routes");
// const shippingRoutes = require("./shippingRoutes");
// const wishlistRoutes = require('./wishlistRoutes');
const adminRoutes = require("./admin_routes");
const cartsRoutes = require('./cart');
const wishlistRoute = require("./wishlistRoutes")
const productRoutes = require('./Product');
const uploadRoutes = require('./upload_routes');
const bannerRoute = require("./banner.routes")

const router = express();

// router.use("/login", loginRoutes);
// router.use("/signup", signupRoutes);
// router.use("/shipping", shippingRoutes);
// router.use('/wishlist', wishlistRoutes);
router.use("/admin", adminRoutes);
router.use('/Cart', cartsRoutes);
router.use("/banner", bannerRoute)
router.use("/wishlist", wishlistRoute)
router.use('/product', productRoutes);
router.use('/upload', uploadRoutes);


module.exports = router;
