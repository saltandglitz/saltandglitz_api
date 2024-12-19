const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image01: {
        type: String,
        required: true
    },
    image02: {
        type: String,
        required: true
    },
    image03: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number, 
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    },
 
});

module.exports = mongoose.model('CartItem', cartItemSchema);
