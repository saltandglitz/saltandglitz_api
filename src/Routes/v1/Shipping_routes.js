const express = require("express")
const { Shipping_Controller } = require("../../Controller")

const router = express.Router()

router.post(
    "/create-shipping",
    Shipping_Controller.create_Shipping
)

router.get(
    "/get-shipping",
    Shipping_Controller.get_Shipping
)
module.exports = router