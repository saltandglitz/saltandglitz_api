const express = require('express');
const router = express.Router();
const CartItem = require('../../Model/cartItem');

<<<<<<< HEAD
router.post('/add', async (req, res) => {
    try {
        const { userId, ...newItem } = req.body;  
        let cartItem = await CartItem.findOne({ id: newItem.id, userId }); // Find by both id and userId

=======

router.post('/add', async (req, res) => {
    try {
        const newItem = req.body;
        let cartItem = await CartItem.findOne({ id: newItem.id });
        
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
        if (cartItem) {
            cartItem.quantity += 1;
            cartItem.totalprice = cartItem.price * cartItem.quantity;
        } else {
            cartItem = CartItem({
                ...newItem,
                quantity: 1,
<<<<<<< HEAD
                totalprice: newItem.price,
                userId // Save userId
            });
        }

        await cartItem.save();
=======
                totalprice: newItem.price
            });
        }
       
        await cartItem.save();

>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


<<<<<<< HEAD

router.post('/remove', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract userId from request body
        let cartItem = await CartItem.findOne({ id, userId });

        if (cartItem) {
            if (cartItem.quantity === 1) {
                await CartItem.deleteOne({ id, userId });
=======
router.post('/remove', async (req, res) => {
    try {
        const { id } = req.body;
        let cartItem = await CartItem.findOne({ id });
        
        if (cartItem) {
            if (cartItem.quantity === 1) {
                await CartItem.deleteOne({ id });
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
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

<<<<<<< HEAD

router.post('/delete', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract userId from request body
        await CartItem.deleteOne({ id, userId });
        res.status(200).json({ message: 'Item deleted', id });
=======
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await CartItem.deleteOne({ id });
        res.status(200).json({ message: 'Item deleted', id }); 
>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
=======

// const coupons = {
//     'PERFECT3': 555,
//     'SHAYAUPSELL10': 2000,
//     'MOUNT5': 5000,
// };

// router.post('/apply-discount', (req, res) => {          
//     const { code } = req.body;
//     const discountAmount = coupons[code.toUpperCase()];
    
//     if (discountAmount) {
//         return res.status(200).json({ discountAmount });
//     } else {
//         return res.status(400).json({ message: 'Invalid discount code' });
//     }
// });
// // router.post('/apply-discount', async (req, res) => {
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

>>>>>>> 0a6699153dccfa34f5f623653daa54d8504c23b8
// router.get('/', async (req, res) => {
//     try {
//         const cartItems = await CartItem.find();
//         res.status(200).json(cartItems);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
