// server/routes/fulfilledOrders.js
import express from 'express';
import FulfilledOrder from '../models/fulfilledOrders.js';

const router = express.Router();

// POST route to fulfill an order
router.post('/', async (req, res) => {
    const { name, address, pincode, state, email, totalAmount, products } = req.body;

    // Validation
    if (!name || !address || !pincode || !state || !email || !totalAmount || !products) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newFulfilledOrder = new FulfilledOrder({
            name,
            address,
            pincode,
            state,
            email,
            totalAmount,
            products: products.map(product => ({
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
                quantity: product.quantity || 1
            }))
        });

        const savedOrder = await newFulfilledOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error fulfilling order:', error);
        res.status(500).json({ message: 'Failed to fulfill the order.', error: error.message });
    }
});

// GET route to fetch all fulfilled orders
router.get('/', async (req, res) => {
    try {
        const fulfilledOrders = await FulfilledOrder.find()
            .sort({ fulfilledAt: -1 }); // Sort by newest first
        res.status(200).json(fulfilledOrders);
    } catch (error) {
        console.error('Error fetching fulfilled orders:', error);
        res.status(500).json({ message: 'Failed to fetch fulfilled orders.', error: error.message });
    }
});

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await FulfilledOrder.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete the order.', error: error.message });
    }
});

export default router;