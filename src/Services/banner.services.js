const { bannerSchema } = require("../Model")

module.exports.createBnner = (body) => {
    return bannerSchema.create(body)
    
}
// console.log(body);

module.exports.getBanner = () => {
    return bannerSchema.find()
}

module.exports.deleteBanner = (id) => {
    return bannerSchema.findByIdAndDelete(id)
}