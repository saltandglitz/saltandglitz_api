const { default: mongoose } = require("mongoose");

const Shipping_Schema = mongoose.Schema(
    {
        firstname: {
            type: String,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        pincode: {
            type: Number,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        mobile: {
            type: Number,
            trim: true
        },
        addressType: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const shipping = mongoose.model("Shipping",Shipping_Schema)
module.exports = shipping