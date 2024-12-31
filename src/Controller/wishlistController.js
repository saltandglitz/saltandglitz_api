const { User, Uplod, wishlistSchema } = require("../Model");

module.exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    const existingProduct = await Uplod.findById(productId);
    if (!existingProduct) {
      return res.status(400).send({ status: false, message: "Product not found" });
    }

    let wishlist = await wishlistSchema.findOne({ userId });

    if (!wishlist) {
      wishlist = new wishlistSchema({
        userId,
        products: [{ productId }]
      });
      await wishlist.save();
      return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist });
    }

    const productInWishlist = wishlist.products.find(item => item.productId.toString() === productId.toString());
    if (productInWishlist) {
      return res.status(400).send({ status: false, message: "Product is already in your wishlist" });
    }

    wishlist.products.push({ productId: productId });
    await wishlist.save();

    return res.status(201).send({ status: true, message: "Product added to wishlist", wishlist });

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
        const { _id, productId, ...body } = product.toObject();  // Extract productId and other fields

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


    if (!wishlist) {
      return res.status(404).send({ status: false, message: "Wishlist not found" });
    }
    console.log(wishlist);

    return res.status(200).send({ status: true, message: "Wishlist retrieved", wishlist: updatedWishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


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
    return res.status(200).send({ status: true, message: "Product removed from wishlist", wishlist });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

