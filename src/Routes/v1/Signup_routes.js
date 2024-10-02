const express = require("express")
const { Signup_Controller } = require("../../Controller")

const router = express.Router()

router.post(
    "/create-signup",
    // cb-controller
    Signup_Controller.create_Signup
)

router.get(
    "/get-signup",
    // cb-controller
    Signup_Controller.get_Signup
)
module.exports = router