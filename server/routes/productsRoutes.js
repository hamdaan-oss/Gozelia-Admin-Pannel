import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Create a product
router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: 'Please provide all required fields: name, price, description, category.' });
    }

    // Create a new product object
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image // Include the image URL in the product object
    });

    // Save the new product
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET unique categories from products
router.get('/categories/unique', async (req, res) => {
  try {
    const products = await Product.find();
    const categories = [...new Set(products.map(product => product.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Add a route to get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;