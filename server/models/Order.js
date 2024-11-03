// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  totalAmount: { type: Number, required: true },
  cod: { type: Boolean, default: false },
  fulfilled: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
