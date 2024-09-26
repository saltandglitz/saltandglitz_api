const express = require('express');
const router = express.Router();
const CartItem = require('../../Model/cartItem');


router.post('/add', async (req, res) => {
    try {
        const newItem = req.body;
        let cartItem = await CartItem.findOne({ id: newItem.id });
        
        if (cartItem) {
            cartItem.quantity += 1;
            cartItem.totalprice = cartItem.price * cartItem.quantity;
        } else {
            cartItem = CartItem({
                ...newItem,
                quantity: 1,
                totalprice: newItem.price
            });
        }
       
        await cartItem.save();

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/remove', async (req, res) => {
    try {
        const { id } = req.body;
        let cartItem = await CartItem.findOne({ id });
        
        if (cartItem) {
            if (cartItem.quantity === 1) {
                await CartItem.deleteOne({ id });
            } else {
                cartItem.quantity -= 1;
                cartItem.totalprice = cartItem.price * cartItem.quantity;
                await cartItem.save();
            }
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await CartItem.deleteOne({ id });
        res.status(200).json({ message: 'Item deleted', id }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router.post('/apply-discount', async (req, res) => {
//     try {
//         const { discountCode } = req.body;
//         let discountPercent = 0;

//         // Validate the coupon code
//         if (discountCode === "PERFECT3") {
//             discountPercent = 3;
//         } else if (discountCode === "SHAYAUPSELL10") {
//             discountPercent = 10;
//         } else if (discountCode === "MOUNT5") {
//             discountPercent = 5;
//         } else {
//             return res.status(400).json({ message: 'Invalid coupon code' });
//         }

//         // Fetch all cart items
//         const cartItems = await CartItem.find();

//         // Calculate subtotal
//         const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//         // Calculate total after applying discount
//         const totalAmount = subtotal - (subtotal * (discountPercent / 100));

//         res.status(200).json({
//             message: `Discount of ${discountPercent}% applied.`,
//             subtotal,
//             discountPercent,
//             totalAmount
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// router.post('/apply-discount', async (req, res) => {
//     try {
//         const { discountCode } = req.body;
//         let discountPercent = 0;

//         // Validate the coupon code
//         if (discountCode === "PERFECT3") {
//             discountPercent = 3;
//         } else if (discountCode === "SHAYAUPSELL10") {
//             discountPercent = 10;
//         } else if (discountCode === "MOUNT5") {
//             discountPercent = 5;
//         } else {
//             return res.status(400).json({ message: 'Invalid coupon code' });
//         }

//         // Fetch all cart items
//         const cartItems = await CartItem.find();

//         // Calculate subtotal
//         const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//         // Calculate total after applying discount
//         const totalAmount = subtotal - (subtotal * (discountPercent / 100));

//         res.status(200).json({
//             message: `Discount of ${discountPercent}% applied.`,
//             subtotal,
//             discountPercent,
//             totalAmount
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const cartItems = await CartItem.find();
//         res.status(200).json(cartItems);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
