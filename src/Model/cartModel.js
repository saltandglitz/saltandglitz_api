const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Optional: use productId if you prefer
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Use this if you have Product models
  title: { type: String, required: true }, 
  image01: { type: String }, 
  price: { type: Number, required: true }, 
  quantity: { type: Number, required: true, default: 1 }, 
  totalprice: { type: Number, required: true }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  totalQuantity: { type: Number, default: 0 }, // To track total item quantities
  subtotal: { type: Number, required: true, default: 0 }, // Sum of item prices
  discount: { type: Number, required: true, default: 0 }, // Discount percentage
  totalAmount: { type: Number, required: true, default: 0 }, // Subtotal minus discount
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
