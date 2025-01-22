const express = require("express")
const { optController } = require("../../Controller")
const route = express.Router()

route.post("/send-otp", optController.sendOtp)
route.post("/get-otp", optController.verifyOtp)

module.exports = route