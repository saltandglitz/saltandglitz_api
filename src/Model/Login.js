const { default: mongoose } = require("mongoose");

const login_Schema = mongoose.Schema(
    {
        mobile: {
            type: Number,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        gender:{
            type: String,
            trim:true
        }
    },
    {
        timestamps: true
    }
)

const login = mongoose.model("Login",login_Schema)
module.exports = login