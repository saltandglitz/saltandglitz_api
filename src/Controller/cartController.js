// const { cartServices } = require("../Services")

// module.exports.addCart = async (req, res) => {
//     try {
//         let body = req.body
//         let { user, product, quantity } = body
//         console.log(user);
//         console.log(product);
//         console.log(quantity);

//         let existingUser = await cartServices.findByUser(user)
//         let existingProduct = await cartServices.findByProduct(product)
//         console.log(existingUser);

//         if (existingUser && existingProduct) {
//             console.log("ITEM IS ALREADY IN YOUR CART");
//             throw new Error("ITEM ALREADY IN YOUR CART")
//         }

//         let cart = await cartServices.addCart(body)

//         res.status(201).json({
//             message: "ADD TO CART SUCCESSFULLY",
//             cart
//         })
//     } catch (err) {
//         res.status(500).json({ err: err.message })
//     }
// }

// module.exports.getCart = async (req, res) => {
//     try {
//         let cart = await cartServices.findAllCartProduct()
//         res.status(200).json({
//             message: "GET ALL CRAT PRODUCT SUCCESSFULLY",
//             cart
//         })
//     } catch (err) {
//         res.status(500).json({ err: err.message })
//     }
// }

// module.exports.removeCart = async (req, res) => {
//     try {
//         let { id } = req.params
//         let cart = await cartServices.findByIdAndDelete(id)
//         res.status(200).json({
//             message: "DELETE FROM CART SUCCESSFULLY",
//             cart
//         })
//     } catch (err) {
//         res.status(500).json({ err: err.message })
//     }
// }

// module.exports.updateQuantity = async (req, res) => {
//     try {
//         let { quantity } = req.body
//         let { id } = req.params
//         // let body = req.body

//         let existingProduct = await cartServices.findById(id)
//         if (!existingProduct) {
//             throw new Error("PRODUCT NOT FOUND")
//         }

//         let cart = await cartServices.findByIdAndUpdate(id, quantity)

//         res.status(200).json({
//             message: "CART UPDATE SUCCESSFULLY",
//             cart
//         })

//     } catch (err) {
//         res.status(500).json({ err: err.message })
//     }
// }


const { isValidObjectId } = require("mongoose");
const { cartSchema, User, Uplod } = require("../Model");

module.exports.addToCart = async (req, res) => {
    let { product, user, quantity } = req.body;

    // console.log(req.body);

    // Validate the user and product IDs
    if (!user || !isValidObjectId(user)) {
        return res.status(400).send({ status: false, message: "Invalid user ID" });
    }

    if (!product || !isValidObjectId(product)) {
        return res.status(400).send({ status: false, message: "Invalid product ID" });
    }

    // Check if the user exists in the database
    let existingUser = await User.exists({ _id: user });
    if (!existingUser) {
        return res.status(400).send({ status: false, message: "User not found" });
    }

    // Check if the product exists in the database
    let upload = await Uplod.exists({ _id: product });
    if (!upload) {
        return res.status(400).send({ status: false, message: "Product not found" });
    }

    // Find the user's cart
    let cart = await cartSchema.findOne({ userId: user });

    if (cart) {
        let productIndex = cart.quantity.findIndex(item => item.productId.toString() === product.toString());

        if (productIndex > -1) {
            cart.quantity[productIndex].quantity += quantity || 1;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.quantity.push({ productId: product, quantity: quantity || 1 });
        }

        // Save the updated cart
        await cart.save();

        // Return the updated cart response
        const updatedCart = {
            cart_id: cart._id,
            userId: cart.userId,
            quantity: cart.quantity.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        return res.status(200).send({ status: true, updatedCart });
    } else {
        // If the cart doesn't exist, create a new cart
        const newCart = await cartSchema.create({
            userId: user,
            quantity: [{ productId: product, quantity: quantity || 1 }]
        });

        // Return the newly created cart
        const newCartResponse = {
            cart_id: newCart._id,
            userId: newCart.userId,
            quantity: newCart.quantity.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        return res.status(201).send({ status: true, newCart: newCartResponse });
    }
};

module.exports.getCart = async (req, res) => {
    let { user } = req.params;

    if (!user || !isValidObjectId(user)) {
        return res.status(400).send({ status: false, message: "Invalid user ID" });
    }

    try {
        let existingUser = await User.exists({ _id: user });
        if (!existingUser) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        let cart = await cartSchema.findOne({ userId: user }).populate('quantity.productId').lean();

        if (!cart) {
            return res.status(404).send({ status: false, message: "Cart is empty" });
        }

        // Debugging: Log cart data
        // console.log("Cart Data:", JSON.stringify(cart, null, 2));

        if (!cart.quantity || !Array.isArray(cart.quantity)) {
            return res.status(500).send({ status: false, message: "Cart structure is invalid" });
        }

        const updatedCart = {
            cart_id: cart._id,
            ...cart,
            _id: undefined,
            quantity: cart.quantity
                .filter(product => product.productId) // Ensure productId is valid
                .map(product => ({
                    _id: undefined,
                    ...product,
                    productId: {
                        product_id: product.productId?._id,
                        ...product.productId,
                        _id: undefined
                    }
                }))
        };

        const totalQuantity = cart.quantity.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const totalPrice = cart.quantity.reduce((sum, item) => sum + (item.quantity * (item.productId?.total14KT || 0)), 0);

        return res.status(200).send({
            status: true,
            message: "Cart fetched successfully",
            cart: updatedCart,
            totalQuantity,
            totalPrice
        });

    } catch (err) {
        console.error("Error in getCart:", err);
        return res.status(500).send({ status: false, message: "Internal server error", error: err.message });
    }
};


module.exports.removeItemFromCart = async (req, res) => {
    let { user, product } = req.params;

    if (!user || !isValidObjectId(user)) {
        return res.status(400).send({ status: false, message: "Invalid user ID" });
    }

    if (!product || !isValidObjectId(product)) {
        return res.status(400).send({ status: false, message: "Invalid product ID" });
    }

    try {
        let existingUser = await User.exists({ _id: user });
        if (!existingUser) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        let cart = await cartSchema.findOne({ userId: user });

        if (!cart) {
            return res.status(404).send({ status: false, message: "Cart is empty" });
        }

        let productIndex = cart.quantity.findIndex(item => item.productId.toString() === product.toString());

        if (productIndex === -1) {
            return res.status(404).send({ status: false, message: "Product not found in cart" });
        }

        cart.quantity.splice(productIndex, 1);

        if (cart.quantity.length === 0) {
            await cartSchema.findByIdAndDelete(cart._id);
            return res.status(200).send({ status: true, message: "Cart is now empty" });
        }

        await cart.save();

        const updatedCartResponse = {
            cart_id: cart._id,
            userId: cart.userId,
            products: cart.quantity.map(item => {
                const { _id, ...productDetails } = item.toObject();
                return {
                    ...productDetails,
                    productId: item.productId,
                };
            })
        };

        return res.status(200).send({
            status: true,
            message: "Product removed from cart successfully",
            updatedCart: updatedCartResponse
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

// module.exports.updateQuantity = async (req, res) => {
//     const { user, product } = req.params;
//     const { operation } = req.body; // "increment" or "decrement"

//     if (!user || !isValidObjectId(user)) {
//         return res.status(400).send({ status: false, message: "Invalid user ID" });
//     }

//     if (!product || !isValidObjectId(product)) {
//         return res.status(400).send({ status: false, message: "Invalid product ID" });
//     }

//     try {
//         let cart = await cartSchema.findOne({ userId: user });

//         if (!cart) {
//             return res.status(404).send({ status: false, message: "Cart not found" });
//         }

//         const productIndex = cart.quantity.findIndex(item => item.productId.toString() === product.toString());

//         if (productIndex === -1) {
//             return res.status(404).send({ status: false, message: "Product not found in cart" });
//         }

//         if (operation === "increment") {
//             cart.quantity[productIndex].quantity += 1;
//         } else if (operation === "decrement") {
//             cart.quantity[productIndex].quantity -= 1;

//             if (cart.quantity[productIndex].quantity <= 0) {
//                 cart.quantity.splice(productIndex, 1);
//             }
//         } else {
//             return res.status(400).send({ status: false, message: "Invalid operation" });
//         }

//         if (cart.quantity.length === 0) {
//             await cartSchema.findByIdAndDelete(cart._id);
//             return res.status(200).send({ status: true, message: "Cart is now empty" });
//         }

//         await cart.save();

//         const updatedCartResponse = {
//             cart_id: cart._id,
//             userId: cart.userId,
//             products: cart.quantity.map(item => ({
//                 productId: item.productId,
//                 quantity: item.quantity
//             }))
//         };

//         return res.status(200).send({
//             status: true,
//             message: `Product quantity ${operation === "increment" ? "increased" : "decreased"} successfully`,
//             updatedCart: updatedCartResponse
//         });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// };


module.exports.incrementQuantity = async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    // Validate input
    if (!cartId || !isValidObjectId(cartId)) {
        return res.status(400).send({ status: false, message: "Invalid cart ID" });
    }

    if (!productId || !isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "Invalid product ID" });
    }

    if (!quantity || quantity <= 0) {
        return res.status(400).send({ status: false, message: "Quantity must be a positive number" });
    }

    try {
        // Find the cart using cartId
        let cart = await cartSchema.findById(cartId);

        if (!cart) {
            return res.status(404).send({ status: false, message: "Cart not found" });
        }

        // Find the product in the cart
        let productIndex = cart.quantity.findIndex(item => item.productId.toString() === productId.toString());

        if (productIndex === -1) {
            return res.status(404).send({ status: false, message: "Product not found in cart" });
        }

        // Increment the product quantity
        cart.quantity[productIndex].quantity += quantity;

        // Save the updated cart
        await cart.save();

        // Return the updated cart
        const updatedCartResponse = {
            cart_id: cart._id,
            userId: cart.userId,
            quantity: cart.quantity.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        return res.status(200).send({
            status: true,
            message: "Product quantity incremented successfully",
            updatedCart: updatedCartResponse
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports.decrementQuantity = async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    // Validate input
    if (!cartId || !isValidObjectId(cartId)) {
        return res.status(400).send({ status: false, message: "Invalid cart ID" });
    }

    if (!productId || !isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "Invalid product ID" });
    }

    if (!quantity || quantity <= 0) {
        return res.status(400).send({ status: false, message: "Quantity must be a positive number" });
    }

    try {
        // Find the cart using cartId
        let cart = await cartSchema.findById(cartId);

        if (!cart) {
            return res.status(404).send({ status: false, message: "Cart not found" });
        }

        // Find the product in the cart
        let productIndex = cart.quantity.findIndex(item => item.productId.toString() === productId.toString());

        if (productIndex === -1) {
            return res.status(404).send({ status: false, message: "Product not found in cart" });
        }

        // Decrement the product quantity, ensuring it does not go below 1
        if (cart.quantity[productIndex].quantity > quantity) {
            cart.quantity[productIndex].quantity -= quantity;
        } else {
            return res.status(400).send({ status: false, message: "Quantity can't be less than 1" });
        }

        // Save the updated cart
        await cart.save();

        // Return the updated cart
        const updatedCartResponse = {
            cart_id: cart._id,
            userId: cart.userId,
            quantity: cart.quantity.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        return res.status(200).send({
            status: true,
            message: "Product quantity decremented successfully",
            updatedCart: updatedCartResponse
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};
