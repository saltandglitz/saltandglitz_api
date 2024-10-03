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

// Remove item or reduce quantity from the cart
router.post('/remove', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract id and userId from request body
        let cartItem = await CartItem.findOne({ id, userId });

        if (cartItem) {
            if (cartItem.quantity === 1) {
                await CartItem.deleteOne({ id, userId });
                res.status(200).json({ message: 'Item removed from cart' });
            } else {
                cartItem.quantity -= 1;
                cartItem.totalprice = cartItem.price * cartItem.quantity;
                await cartItem.save();
                res.status(200).json(cartItem);
            }
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete item from the cart completely
router.post('/delete', async (req, res) => {
    try {
        const { id, userId } = req.body; // Extract id and userId from request body
        await CartItem.deleteOne({ id, userId });
        res.status(200).json({ message: 'Item deleted', id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all items from the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
