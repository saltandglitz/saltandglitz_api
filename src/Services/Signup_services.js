const { Signup } = require("../Model")

const services_Signup = (data) => {
    return Signup.create(data)
}

const Get_Signup = () => {
    return Signup.find()
}

module.exports = {
    services_Signup,
    Get_Signup
}