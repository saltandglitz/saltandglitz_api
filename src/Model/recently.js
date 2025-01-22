// models/Product.js
const mongoose = require('mongoose');

const recentlySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image01: { type: String, required: true },
});

const Recently = mongoose.model('Recently', recentlySchema);

module.exports = Recently;
