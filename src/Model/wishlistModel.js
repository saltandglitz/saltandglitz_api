// models/wishlistModel.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    image01: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('WishlistItem', wishlistSchema);
