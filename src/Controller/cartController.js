const {cart_Services} = require('../Services');

const addToCart = async (req, res) => {
  try {
    const cart = await cart_Services.addItemToCart(req.user.id, req.body.product);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await cart_Services.removeItemFromCart(req.user.id, req.params.productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const cart = await cart_Services.deleteItemFromCart(req.user.id, req.params.productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from cart', error });
  }
};
module.exports = {
  addToCart,
  deleteFromCart,
  removeFromCart
}