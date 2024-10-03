const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  totalQuantity: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
