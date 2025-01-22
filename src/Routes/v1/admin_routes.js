const express = require("express")
const { Admin_Controller } = require("../../Controller")

const router = express.Router()

router.post(
    "/create-admin",
    Admin_Controller.create_Admin
)

router.get(
    "/get-admin",
    Admin_Controller.get_Admin
)
module.exports = router