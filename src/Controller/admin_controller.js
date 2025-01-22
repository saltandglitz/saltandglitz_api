const { admin_Services } = require("../Services");

const create_Admin = async (req, res) => {
    try {
        const data = req.body;
        // console.log('Received Data:', data);
        const new_Admin = await admin_Services.Create_Admin(data);

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

const get_Admin = async (req, res) => {
    try {
        const new_Admin = await admin_Services.Get_Admin()

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
    create_Admin,
    get_Admin
}