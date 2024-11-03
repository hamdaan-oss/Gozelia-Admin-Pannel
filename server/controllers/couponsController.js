import Coupon from '../models/Coupon.js';

// Helper function to validate ObjectId format
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Create a coupon
export const createCoupon = async (req, res) => {
  const { code, discountAmount, applicableProducts, expiryDate } = req.body;

  if (!code || !discountAmount) {
    return res.status(400).json({ message: 'Coupon code and discount amount are required.' });
  }

  try {
    const newCoupon = new Coupon({ code, discountAmount, applicableProducts, expiryDate });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().populate('applicableProducts');
    res.status(200).json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid coupon ID' });
  }

  try {
    const coupon = await Coupon.findById(id).populate('applicableProducts');
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { code, discountAmount, applicableProducts, expiryDate } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid coupon ID' });
  }

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { code, discountAmount, applicableProducts, expiryDate },
      { new: true, runValidators: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid coupon ID' });
  }

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted successfully', deletedCoupon });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ message: error.message });
  }
};

// Validate a coupon by code and check expiration
export const validateCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
    if (isExpired) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    res.status(200).json({ message: 'Coupon is valid', coupon });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ message: error.message });
  }
};
