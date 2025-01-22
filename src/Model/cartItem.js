const mongoose = require('mongoose');

// Define the cart schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true
  },
  quantity: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",  // Reference to the Product (Upload) model
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1  // Default quantity if not provided
    }
  }]
});

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;


// const cartItemSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     image01: {
//         type: String,
//         required: true
//     },
//     image02: {
//         type: String,
//         required: true
//     },
//     image03: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     totalprice: {
//         type: Number, 
//         required: true
//     },
//     discount: {
//         type: Number,
//         default: 0
//     },
//     subtotal: {
//         type: Number,
//         default: 0
//     },
 
// });

// module.exports = mongoose.model('CartItem', cartItemSchema);