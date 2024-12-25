const { User, Uplod, wishlistSchema } = require("../Model");

module.exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    // Check if the product exists
    const existingProduct = await Uplod.findById(productId);
    if (!existingProduct) {
      return res.status(400).send({ status: false, message: "Product not found" });
    }

    // Check if the user already has a wishlist
    let wishlist = await wishlistSchema.findOne({ userId });

    if (!wishlist) {
      // If no wishlist exists, create a new one
      wishlist = new wishlistSchema({
        userId,
        products: [{ productId, quantity: 1 }]  // Add product with quantity 1
      });
      await wishlist.save();
      return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist });
    }

    // Check if the product is already in the wishlist
    const productInWishlist = wishlist.products.find(item => item.productId.toString() === productId.toString());
    if (productInWishlist) {
      return res.status(400).send({ status: false, message: "Product is already in your wishlist" });
    }

    // Add the product to the wishlist
    wishlist.products.push({ productId, quantity: 1 });
    await wishlist.save();

    return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getWishlist = async (req, res) => {
  const { userId } = req.params;  // Assuming userId is passed as a route parameter

  try {
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    // Find the user's wishlist
    const wishlist = await wishlistSchema.findOne({ userId })
      .populate("products.productId", "title price image01");  // Populating product data (title, price, image) as an example

    if (!wishlist) {
      return res.status(404).send({ status: false, message: "Wishlist not found" });
    }

    // If wishlist exists, return the wishlist with products
    return res.status(200).send({ status: true, message: "Wishlist retrieved", wishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


module.exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;  // userId and productId are passed as route parameters

  try {
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    // Find the user's wishlist
    const wishlist = await wishlistSchema.findOne({ userId });
    if (!wishlist) {
      return res.status(404).send({ status: false, message: "Wishlist not found" });
    }

    // Find the product in the wishlist and remove it
    const productIndex = wishlist.products.findIndex(item => item.productId.toString() === productId.toString());

    if (productIndex === -1) {
      return res.status(404).send({ status: false, message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);  // Removes the product at the found index
    await wishlist.save();  // Save the updated wishlist

    return res.status(200).send({ status: true, message: "Product removed from wishlist", wishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

