const { default: mongoose } = require("mongoose");

const Signup_Schema = mongoose.Schema(
    {
        mobile: {
            type: Number,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

const signup = mongoose.model("Signup",Signup_Schema)
module.exports = signup