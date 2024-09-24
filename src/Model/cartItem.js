const mongoose = require('mongoose');

const cartItemSchema =  mongoose.Schema({
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
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
