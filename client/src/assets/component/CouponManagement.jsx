import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const newCoupon = { code: couponCode, discount: Number(discount) };
      await axios.post('http://localhost:4000/api/coupons/create', newCoupon);
      fetchCoupons(); // Refresh coupon list
      setCouponCode('');
      setDiscount('');
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/coupons/${id}`);
      fetchCoupons(); // Refresh coupon list
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Coupon Management</h1>
      <form onSubmit={handleCreateCoupon} className="mb-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount (%)"
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Coupon
        </button>
      </form>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Coupon Code</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td className="border p-2">{coupon.code}</td>
              <td className="border p-2">{coupon.discount}%</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponManagement;
