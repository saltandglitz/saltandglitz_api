const { default: mongoose } = require("mongoose");

const Admin_Schema = mongoose.Schema(
    {
        email: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const admin = mongoose.model("Admin",Admin_Schema)
module.exports = admin