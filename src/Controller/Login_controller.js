const { login_Sevices } = require("../Services")
const sendEmail = require("../Services/emailServices");
const create_Login = async (req, res) => {
    try {
        const data = req.body;
        // console.log('Received Data:', data);
        const new_Admin = await login_Sevices.services_Login(data);

        await sendEmail(data);
        res.status(200).json({
            message: "Created",
            success: true,
            data: new_Admin
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
};


const get_Login = async (req, res) => {
    try {
        const new_Admin = await login_Sevices.Get_Login()

            res.status(200).json({
                message: "Founded",
                success: true,
                data: new_Admin
            })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    create_Login,
    get_Login
}