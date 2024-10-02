const { shipping_Services } = require("../Services");

const create_Shipping = async (req, res) => {
    try {
        const data = req.body;
        // console.log(req.body);
        
        const new_Shipping = await shipping_Services.Create_Shipping(data);
        res.status(200).json({
            message: "Created",
            success: true,
            data: new_Shipping
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
};


const get_Shipping = async (req, res) => {
    try {
        const new_Shipping = await shipping_Services.Get_Shipping()

            res.status(200).json({
                message: "Founded",
                success: true,
                data: new_Shipping
            })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    create_Shipping,
    get_Shipping
}