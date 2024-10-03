const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
<<<<<<< HEAD
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
=======
    id:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    image01:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    quantity:
    {
        type: Number,
        required: true
    },
    totalprice:
    {
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
<<<<<<< HEAD
    subtotal: {
        type: Number,
        default: 0
    },
    // userId: {  // Add userId to link cart items to a specific user
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
=======
    subtotal:
    {
        type: Number,
        default: 0
    },
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
});

module.exports = mongoose.model('CartItem', cartItemSchema);
