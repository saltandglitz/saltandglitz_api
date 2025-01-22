const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [  // Changed the array name from quantity to products
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Upload", // Assuming you have the Upload model
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
