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
// const recentlyViewedRoutes = require('./recently_routes');
const bannerRoute = require("./banner.routes")
const getCategoryRoute = require("./categoryData.routes")
const otpRoute = require("./otp.routes")

const router = express();

// router.use("/login", loginRoutes);
// router.use("/signup", signupRoutes);
// router.use("/shipping", shippingRoutes);
// router.use('/wishlist', wishlistRoutes);
router.use("/admin", adminRoutes);
router.use('/cart', cartsRoutes);
router.use("/banner", bannerRoute)
router.use("/wishlist", wishlistRoute)
router.use('/product', productRoutes);
router.use('/upload', uploadRoutes);
router.use("/category", getCategoryRoute);
router.use("/otp", otpRoute)
// router.use("/recently", recentlyViewedRoutes)


module.exports = router;
