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
        await CartItem.findByIdAndDelete({ id });
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
