const { Admin } = require("../Model")

const Create_Admin = (data) => {
    return Admin.create(data)
}

const Get_Admin = () => {
    return Admin.find()
}

module.exports = {
    Create_Admin,
    Get_Admin
}