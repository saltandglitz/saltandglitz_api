let express = require("express")
const { categoryDataController } = require("../../Controller")

let route = express()

route.get("/categoryData/:gender?", categoryDataController.getCategoryData)
// route.get("/maleCategory/:gender?/:category?", categoryDataController.getCategories)
route.get("/getCategoryAndSubCategoryDetails", categoryDataController.getCategoryAndSubCategoryDetails)

module.exports = route