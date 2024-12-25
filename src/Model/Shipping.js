// const { default: mongoose } = require("mongoose");

// const Shipping_Schema = mongoose.Schema(
//     {
//         firstname: {
//             type: String,
//             trim: true
//         },
//         lastname: {
//             type: String,
//             trim: true
//         },
//         address: {
//             type: String,
//             trim: true
//         },
//         pincode: {
//             type: Number,
//             trim: true
//         },
//         city: {
//             type: String,
//             trim: true
//         },
//         state: {
//             type: String,
//             trim: true
//         },
//         country: {
//             type: String,
//             trim: true
//         },
//         mobile: {
//             type: Number,
//             trim: true
//         },
//         addressType: {
//             type: String,
//             trim: true
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// const shipping = mongoose.model("Shipping",Shipping_Schema)
// module.exports = shipping


// const mongoose = require("mongoose")

// const shippingSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true
//         },
//         address: {
//             type: String,
//             required: true
//         },
//         city: {
//             type: String,
//             required: true
//         },
//         state: {
//             type: String,
//             required: true
//         },
//         postel_code: {
//             type: String,
//             required: true
//         },
//         country: {
//             type: String,
//             required: true
//         },
//         shipping_status: {
//             type: String,
//             enum: ["pending", "shipped", "delivered"],
//             default: "pending"
//         }
//     },
//     { timestamps: true }
// )

// let shipping = mongoose.model("shippingSchema", shippingSchema)

// module.exports = shipping