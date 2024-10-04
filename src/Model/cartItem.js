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
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
    // userId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User', 
    //     required: true // Make userId required to ensure cart is linked to a user
    // }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
