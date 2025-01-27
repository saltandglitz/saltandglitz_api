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
      // If no wishlist, create one with the first product
      wishlist = new wishlistSchema({
        userId,
        products: [{ productId }]
      });
      await wishlist.save(); // Save the new wishlist

      // Create response with wishlist_id and without _id in products
      const responseWishlist = {
        wishlist_id: wishlist._id,
        userId: wishlist.userId,
        products: wishlist.products.map(product => ({
          productId: product.productId // Only include productId
        }))
      };

      return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist: responseWishlist });
    }

    // Check if the product is already in the wishlist
    const productInWishlist = wishlist.products.find(item => item.productId.toString() === productId.toString());
    if (productInWishlist) {
      return res.status(400).send({ status: false, message: "Product is already in your wishlist" });
    }

    // Add the new product to the wishlist
    wishlist.products.push({ productId });

    // Save the updated wishlist
    await wishlist.save();

    // Create response with wishlist_id and without _id in products
    const updatedWishlist = {
      wishlist_id: wishlist._id,
      userId: wishlist.userId,
      products: wishlist.products.map(product => ({
        productId: product.productId // Only include productId
      }))
    };

    return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist: updatedWishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    let wishlist = await wishlistSchema.findOne({ userId }).populate("products.productId");

    const updatedWishlist = {
      wishlist_id: wishlist._id,
      ...wishlist.toObject(),
      _id: undefined,

      products: wishlist.products.map(product => {
        const { _id, productId, ...body } = product.toObject();
        return {
          _id: undefined,
          ...body,
          productId: {
            product_id: productId._id,
            ...productId,
            _id: undefined
          }
        };
      })

    };


    if (!updatedWishlist) {
      return res.status(404).send({ status: false, message: "Wishlist not found" });
    }
    console.log(updatedWishlist);

    return res.status(200).send({ status: true, message: "Wishlist retrieved", wishlist: updatedWishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.checkWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const wishlistItem = await wishlistSchema.findOne({ userId, productId });
    res.json({ isInWishlist: !!wishlistItem }); // Return true if item exists, else false
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist status' });
  }
}
module.exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    const wishlist = await wishlistSchema.findOne({ userId });
    if (!wishlist) {
      return res.status(404).send({ status: false, message: "Wishlist not found" });
    }

    const productIndex = wishlist.products.findIndex(item => item.productId.toString() === productId.toString());

    if (productIndex === -1) {
      return res.status(404).send({ status: false, message: "Product not found in wishlist" });
    }

    wishlist.products.splice(productIndex, 1);

    if (wishlist.products.length === 0) {
      await wishlistSchema.deleteOne({ userId });
      return res.status(200).send({ status: true, message: "Wishlist is now empty" });
    }

    await wishlist.save();

    const updatedWishlist = {
      wishlist_id: wishlist._id,
      ...wishlist.toObject(),
      _id: undefined,

      products: wishlist.products.map(product => {
        const { _id, ...productDetails } = product.toObject();
        return {
          ...productDetails,
          productId: product.productId
        };
      })
    };

    return res.status(200).send({ status: true, message: "Product removed from wishlist", updatedWishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};