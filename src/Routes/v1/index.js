const express = require("express")

const loginRoutes = require("./Login_routes")
const signupRoutes = require("./Signup_routes")
const shippingRoutes = require("./Shipping_routes")
const adminRoutes = require("./admin_routes")
const cartRoutes = require('./cartRoutes')
const router = express()

router.use("/login",loginRoutes)
router.use("/signup",signupRoutes)
router.use("/shipping",shippingRoutes)
router.use("/admin",adminRoutes)
router.use('/cart',cartRoutes)


module.exports = router