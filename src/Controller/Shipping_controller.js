// const { shipping_Services } = require("../Services");

const { User, shippingSchema } = require("../Model")

// const create_Shipping = async (req, res) => {
//     try {
//         const data = req.body;
//         // console.log(req.body);

//         const new_Shipping = await shipping_Services.Create_Shipping(data);
//         res.status(200).json({
//             message: "Created",
//             success: true,
//             data: new_Shipping
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: error.message,
//             success: false
//         });
//     }
// };


// const get_Shipping = async (req, res) => {
//     try {
//         const new_Shipping = await shipping_Services.Get_Shipping()

//             res.status(200).json({
//                 message: "Founded",
//                 success: true,
//                 data: new_Shipping
//             })
//     } catch (error) {
//         res.status(400).json({
//             message: error.message,
//             success: false
//         })
//     }
// }


// module.exports = {
//     create_Shipping,
//     get_Shipping
// }


module.exports.createShipping = async (req, res) => {
    let { userId, address, city, state, postel_code, country } = req.body

    try {
        let user = await User.findById(userId)
        console.log(user);

        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }

        const newShipping = new shippingSchema({ userId, address, city, state, postel_code, country })

        await newShipping.save()
        return res.status(201).send({
            messsage: "SHIPPING CREATED",
            newShipping
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}



