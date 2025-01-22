const { default: mongoose } = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then((data) => {
        if (data) {
            console.log("Database Connect Successfully");
        }
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDB