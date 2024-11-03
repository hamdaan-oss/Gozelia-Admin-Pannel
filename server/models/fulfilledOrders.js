import mongoose from 'mongoose';

const fulfilledOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  products: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    productImage: { type: String },
    quantity: { type: Number, default: 1 }
  }],
  fulfilledAt: { type: Date, default: Date.now }
});

const FulfilledOrder = mongoose.model('FulfilledOrder', fulfilledOrderSchema);
export default FulfilledOrder;