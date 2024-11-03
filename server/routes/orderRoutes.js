import express from 'express';
import Order from '../models/Order.js'; // Ensure the path to your Order model is correct

const router = express.Router();

// Helper function to validate ObjectId format
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Create an order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: error.message });
  }
});

// Export the router as a default export
export default router; // Use default export
