import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js'; // Adjust the path as necessary

const router = express.Router();
const { isValidObjectId } = mongoose;

// Create a user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure the fields from the request body
    const newUser = new User({ username, email, password }); // Create a new user
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message }); // Return error message for bad requests
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Respond with the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message }); // Return error message for server issues
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  // Validate ObjectId format
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Delete the user by ID
    if (!deletedUser) return res.status(404).json({ message: 'User not found' }); // Check if the user was found
    res.status(200).json({ message: 'User deleted successfully' }); // Respond with a success message
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message }); // Return error message for server issues
  }
});

export default router; // Export the router
