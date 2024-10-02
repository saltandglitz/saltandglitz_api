const cartService = require('../Services/cartServies');

exports.addItem = async (req, res) => {
  try {
    const newItem = await cartService.addToCart(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedCart = await cartService.removeFromCart(itemId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedCart = await cartService.deleteFromCart(itemId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item from cart' });
  }
};

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
    res.status(500).json({ error: 'Error applying coupon code' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cart = await cartService.getCartItems();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving cart items' });
  }
};
