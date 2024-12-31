let express = require("express")
const { bannerController } = require("../../Controller")
const upload = require("../../middleware/multer")

const route = express.Router()

route.post("/bannerAdd", upload.single("bannerImage"), bannerController.addBanner)
route.get("/bannerGet", bannerController.getBanner)
route.delete("/bannerRemove/:id", bannerController.deleteBanner)

module.exports = route