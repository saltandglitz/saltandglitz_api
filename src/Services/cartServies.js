<<<<<<< HEAD
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
=======
const Cart = require('../Model');

exports.addItemToCart = async (userId, product) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find product and user (validation check)
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if cart exists for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, items: [] });
    }

    // Add product to the cart
    const cartItem = cart.items.find(item => item.productId.equals(productId));

    if (cartItem) {
      // Update quantity if the item already exists
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

    // Calculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.subtotal = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Item added to cart', cart });

  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Error adding item to cart', error });
  }

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
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
};
