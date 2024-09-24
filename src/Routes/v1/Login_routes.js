const express = require("express")
const { Login_Controller } = require("../../Controller")

const router = express.Router()

router.post(
    "/create-login",
    // cb-controller
    Login_Controller.create_Login
)

router.get(
    "/get-login",
    // cb-controller
    Login_Controller.get_Login
)
module.exports = router