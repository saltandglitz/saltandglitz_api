const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    image01: { type: String, required: true },
    price: { type: Number, required: true },
});
    
const WishlistItem = mongoose.model('WishlistItem', wishlistSchema); // Define the model

module.exports = WishlistItem; // Export the model
