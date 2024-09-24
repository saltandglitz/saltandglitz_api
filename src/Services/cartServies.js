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
};
