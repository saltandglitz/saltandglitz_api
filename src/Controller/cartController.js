const cartService = require('../Services/cartServies');

// Add item to cart
exports.addItem = async (req, res) => {
  try {
    const newItem = await cartService.addItemToCart(req.user.id, req.body.product);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const cart = await cartService.removeItemFromCart(req.user.id, req.params.productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

// Delete item from cart
exports.deleteItem = async (req, res) => {
  try {
    const cart = await cartService.deleteItemFromCart(req.user.id, req.params.productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from cart', error });
  }
};

// Apply coupon code
exports.applyCoupon = async (req, res) => {
  try {
    const { discountCode } = req.body;
    const { cart, errorMessage } = await cartService.applyCoupon(discountCode);
    if (errorMessage) {
      res.status(400).json({ message: errorMessage });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error applying coupon code', error });
  }
};

// Get cart items
exports.getCartItems = async (req, res) => {
  try {
    const cart = await cartService.getCartItems(req.user.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
};

// Export the methods
module.exports = {
  addItem: exports.addItem,
  removeItem: exports.removeItem,
  deleteItem: exports.deleteItem,
  applyCoupon: exports.applyCoupon,
  getCartItems: exports.getCartItems
};
