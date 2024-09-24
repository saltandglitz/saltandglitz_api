const Cart = require('../Model');

exports.addItemToCart = async (userId, product) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [], totalQuantity: 0, subtotal: 0, totalAmount: 0 });
  }

  const existingItem = cart.items.find(item => item.productId.equals(product.id));
  
  if (existingItem) {
    existingItem.quantity++;
    existingItem.price += product.price;
  } else {
    cart.items.push({ productId: product.id, quantity: 1, price: product.price });
  }

  cart.totalQuantity++;
  cart.subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  cart.totalAmount = cart.subtotal - (cart.subtotal * (cart.discount / 100));

  await cart.save();
  return cart;
};

exports.removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  const item = cart.items.find(item => item.productId.equals(productId));
  if (!item) return cart;

  if (item.quantity === 1) {
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
  } else {
    item.quantity--;
    item.price -= item.price;
  }

  cart.totalQuantity--;
  cart.subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  cart.totalAmount = cart.subtotal - (cart.subtotal * (cart.discount / 100));

  await cart.save();
  return cart;
};

exports.deleteItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  const item = cart.items.find(item => item.productId.equals(productId));
  if (!item) return cart;

  cart.items = cart.items.filter(item => !item.productId.equals(productId));
  cart.totalQuantity -= item.quantity;

  cart.subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  cart.totalAmount = cart.subtotal - (cart.subtotal * (cart.discount / 100));

  await cart.save();
  return cart;
};
