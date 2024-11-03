import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountAmount: { type: Number, required: true, min: 0 }, // Ensure non-negative
  applicableProducts: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Link to Product ID
    productName: { type: String, required: true }}],
  expiryDate: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(value) {
        return value > Date.now(); // Ensure the expiry date is in the future
      },
      message: 'Expiry date must be in the future.'
    }
  },
  selectedCategory: { type: String },
  maxUsage: { type: Number, default: 1 }, // Limit usage (optional)
});

export default mongoose.model('Coupon', couponSchema);
