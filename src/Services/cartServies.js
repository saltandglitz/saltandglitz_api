const Cart = require('../Model/cartModel');

const calculateCartValues = (cart) => {
  cart.subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  cart.totalAmount = cart.subtotal - (cart.subtotal * (cart.discount / 100));
};

exports.addToCart = async (item) => {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ items: [], subtotal: 0, discount: 0, totalAmount: 0 });
  }

  const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalprice += item.price;
  } else {
    cart.items.push({
      ...item,
      quantity: 1,
      totalprice: item.price
    });
  }

  calculateCartValues(cart);
  return await cart.save();
};

exports.removeFromCart = async (itemId) => {
  const cart = await Cart.findOne();

  if (!cart) throw new Error('Cart not found');

  const existingItem = cart.items.find((cartItem) => cartItem.id === itemId);

  if (!existingItem) return;

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    existingItem.totalprice -= existingItem.price;
  } else {
    cart.items = cart.items.filter((item) => item.id !== itemId);
  }

  calculateCartValues(cart);
  return await cart.save();
};

exports.deleteFromCart = async (itemId) => {
  const cart = await Cart.findOne();

  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter((item) => item.id !== itemId);

  calculateCartValues(cart);
  return await cart.save();
};

exports.applyCoupon = async (discountCode) => {
  const cart = await Cart.findOne();

  if (!cart) throw new Error('Cart not found');

  let discountPercent = 0;
  let errorMessage = null;

  if (discountCode === 'PERFECT3') {
    discountPercent = 3;
  } else if (discountCode === 'SHAYAUPSELL10') {
    discountPercent = 10;
  } else if (discountCode === 'MOUNT5') {
    discountPercent = 5;
  } else {
    errorMessage = 'Invalid coupon code';
    discountPercent = 0;
  }

  cart.discount = discountPercent;
  calculateCartValues(cart);

  await cart.save();

  return { cart, errorMessage };
};

exports.getCartItems = async () => {
  return await Cart.findOne();
};
