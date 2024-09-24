const { signup_Services } = require("../Services");

const create_Signup = async (req, res) => {
    try {
        const data = req.body;
        // console.log('Received Data:', data);
        const new_Admin = await signup_Services.services_Signup(data);
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


const get_Signup = async (req, res) => {
    try {
        const new_Admin = await signup_Services.Get_Signup()

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
    create_Signup,
    get_Signup
}