const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  image01: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalprice: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({  
  items: [cartItemSchema],
  subtotal: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 }, // discount percentage
  totalAmount: { type: Number, required: true, default: 0 } // subtotal - discount
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
