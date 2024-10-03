const Cart = require('../Model/cartModel');
const Product = require('../Model/Product');
const User = require('../Model/User');

// Utility function to calculate cart totals
const calculateCartValues = (cart) => {
  cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
  cart.subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  cart.totalAmount = cart.subtotal - (cart.subtotal * (cart.discount / 100));
};

// Add item to cart
exports.addItemToCart = async (userId, productId, quantity) => {
  try {
    // Fetch product and user details
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const cartItem = cart.items.find(item => item.productId.equals(productId));

    if (cartItem) {
      // Update quantity and price if the item already exists
      cartItem.quantity += quantity;
      cartItem.price = product.price * cartItem.quantity;
    } else {
      // Add a new item to the cart
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: product.price * quantity
      });
    }

    // Recalculate cart totals
    calculateCartValues(cart);

    // Save the updated cart
    await cart.save();

    return { message: 'Item added to cart', cart };

  } catch (error) {
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

// Remove item from cart
exports.removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error('Cart not found');

  const item = cart.items.find(item => item.productId.equals(productId));
  if (!item) return cart;

  if (item.quantity > 1) {
    // Reduce item quantity and price
    item.quantity--;
    item.price = item.quantity * item.price; // Update price based on new quantity
  } else {
    // Remove item if quantity is 1
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
  }

  // Recalculate cart totals
  calculateCartValues(cart);

  await cart.save();
  return cart;
};

// Delete item from cart
exports.deleteItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error('Cart not found');

  // Filter out the item to delete it
  cart.items = cart.items.filter(item => !item.productId.equals(productId));

  // Recalculate cart totals
  calculateCartValues(cart);

  await cart.save();
  return cart;
};

// Apply a discount coupon
exports.applyCoupon = async (userId, discountCode) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error('Cart not found');

  let discountPercent = 0;
  let errorMessage = null;

  // Define discount codes and their percentages
  const discountCodes = {
    'PERFECT3': 3,
    'SHAYAUPSELL10': 10,
    'MOUNT5': 5
  };

  if (discountCodes[discountCode]) {
    discountPercent = discountCodes[discountCode];
  } else {
    errorMessage = 'Invalid coupon code';
  }

  cart.discount = discountPercent;
  calculateCartValues(cart);

  await cart.save();

  return { cart, errorMessage };
};

// Get cart items
exports.getCartItems = async (userId) => {
  return await Cart.findOne({ userId });
};
