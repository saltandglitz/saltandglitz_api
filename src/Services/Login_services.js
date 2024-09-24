const { Login } = require("../Model")

const services_Login = (data) => {
    return Login.create(data)
}

const Get_Login = () => {
    return Login.find()
}

module.exports = {
    services_Login,
    Get_Login
}