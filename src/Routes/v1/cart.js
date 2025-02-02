// const express = require('express');
// const router = express.Router();
// const CartItem = require('../../Model/cartItem');

// // Add an item to the cart
// router.post('/add', async (req, res) => {
//     try {
//         console.log("Request Body:", req.body); // Debug incoming request

//         const { userId, id, title, price, image01, selectedSize, confirmedMetal, confirmedDiamondQuality } = req.body;

//         if (!userId || !id || !title || !price) {
//             console.log("Missing required fields");
//             return res.status(400).json({ message: "Invalid or missing data in request" });
//         }

//         let cartItem = await CartItem.findOne({ id, userId });

//         if (cartItem) {
//             cartItem.quantity += 1;
//             cartItem.totalprice = cartItem.price * cartItem.quantity;
//         } else {
//             cartItem = new CartItem({
//                 id,
//                 title,
//                 price,
//                 image01,
//                 quantity: 1,
//                 totalprice: price,
//                 selectedSize: selectedSize || "defaultSize",
//                 confirmedMetal: confirmedMetal || "defaultMetal",
//                 confirmedDiamondQuality: confirmedDiamondQuality || "defaultDiamondQuality",
//                 userId
//             });
//         }

//         await cartItem.save();
//         res.status(201).json(cartItem);
//     } catch (error) {
//         console.error("Error adding item to cart:", error); // Debug error
//         res.status(500).json({ message: "Failed to add to cart", error: error.message });
//     }
// });


// // Remove item or reduce quantity from the cart
// router.post('/remove', async (req, res) => {
//     try {
//         const { id, userId } = req.body; // Extract id and userId from request body
//         let cartItem = await CartItem.findOne({ id, userId });

//         if (cartItem) {
//             if (cartItem.quantity === 1) {
//                 await CartItem.deleteOne({ id, userId });
//                 res.status(200).json({ message: 'Item removed from cart' });
//             } else {
//                 cartItem.quantity -= 1;
//                 cartItem.totalprice = cartItem.price * cartItem.quantity;
//                 await cartItem.save();
//                 res.status(200).json(cartItem);
//             }
//         } else {
//             res.status(404).json({ message: 'Item not found in cart' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete item from the cart completely
// router.post('/delete', async (req, res) => {
//     try {
//         const { id, userId } = req.body; 
//         await CartItem.deleteOne({ id, userId });
//         res.status(200).json({ message: 'Item deleted', id });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get all items from the cart
// router.get('/', async (req, res) => {
//     try {
//         const cartItems = await CartItem.find();
//         res.status(200).json(cartItems);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// // router.post('/add', async (req, res) => {
// //     try {
// //         const { userId, productId, quantity } = req.body;
// //         const cartItem = await CartItem.create({ userId, productId, quantity });
// //         res.status(201).json(cartItem);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// // // Remove from Cart
// // router.post('/remove/:id', async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         await CartItem.findByIdAndDelete(id);
// //         res.status(204).send();
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// // // Delete Cart for a User
// // router.post('/delete/:userId', async (req, res) => {
// //     try {
// //         const { userId } = req.params;
// //         await CartItem.deleteMany({ userId });
// //         res.status(204).send();
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// module.exports = router;


let express = require("express")
const { cartController } = require("../../Controller")

const route = express.Router()

route.post("/addCart", cartController.addToCart)
route.get("/getCart/:user", cartController.getCart)
route.delete("/remove/:user/:product", cartController.removeItemFromCart)
// route.patch("/updateQuantity/:user/:product", cartController.updateQuantity);
route.post("/cartIncrement", cartController.incrementQuantity)
route.post("/cartDecrement", cartController.decrementQuantity)
// route.delete("/removeCart/:id", cartController.removeCart)
// route.put("/cartUpdate/:id", cartController.updateQuantity)

module.exports = route