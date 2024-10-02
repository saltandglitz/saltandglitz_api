const mongoose = require('mongoose');

const productSchema =  mongoose.Schema({
    Title: String,
    Handle: Number, 
    Option1Value: String,
    // desc: String,
    // imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
