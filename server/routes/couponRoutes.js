import express from 'express';
import { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon, validateCoupon } from '../controllers/couponsController.js';

const router = express.Router();

// Route to create a coupon
router.post('/create', createCoupon);

// Route to get all coupons
router.get('/', getCoupons);

// Route to get a coupon by ID
router.get('/:id', getCouponById);

// Route to update a coupon
router.put('/:id', updateCoupon);

// Route to delete a coupon
router.delete('/:id', deleteCoupon);

// Route to validate a coupon
router.post('/validate', validateCoupon);

export default router;
