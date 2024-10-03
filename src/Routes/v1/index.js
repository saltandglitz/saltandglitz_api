const express = require("express")

const loginRoutes = require("./Login_routes")
const signupRoutes = require("./Signup_routes")
const shippingRoutes = require("./Shipping_routes")
const adminRoutes = require("./admin_routes")
const cartRoutes = require('./cartRoutes')
const cartsRoutes = require('./cart')
const wishlistRoutes = require('./wishlistRoutes')
<<<<<<< HEAD
const productRoutes = require('./Product')
=======
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
const router = express()

router.use("/login",loginRoutes)
router.use("/signup",signupRoutes)
router.use("/shipping",shippingRoutes)
router.use("/admin",adminRoutes)
router.use('/cart',cartRoutes)
router.use('/carts',cartsRoutes)
router.use('/wishlist',wishlistRoutes)
<<<<<<< HEAD
router.use('/product',productRoutes)
=======
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8

module.exports = router