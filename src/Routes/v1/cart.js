const express = require('express');
const router = express.Router();
const CartItem = require('../../Model/cartItem');

// Add an item to the cart
router.post('/add', async (req, res) => {
    try {
        const { userId, ...newItem } = req.body;  // Destructure userId and other item details
        let cartItem = await CartItem.findOne({ id: newItem.id, userId }); // Find by both id and userId

        if (cartItem) {
            cartItem.quantity += 1;
            cartItem.totalprice = cartItem.price * cartItem.quantity;
        } else {
            cartItem = new CartItem({
                ...newItem,
                quantity: 1,
                totalprice: newItem.price,
                userId // Save userId
            });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove an item from the cart
router.post('/remove', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract id and userId from request body
        let cartItem = await CartItem.findOne({ id, userId });

        if (cartItem) {
            if (cartItem.quantity === 1) {
                await CartItem.deleteOne({ id, userId });
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

// Delete an item from the cart
router.post('/delete', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract id and userId from request body
        await CartItem.deleteOne({ id, userId });
        res.status(200).json({ message: 'Item deleted', id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
