import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      setError(err);
    }
  };

  const handleFulfillOrder = async (order) => {
    try {
      // Prepare the products array with correct structure
      const products = [{
        productId: order.productId,
        productName: order.productName,
        productImage: order.productImage,
        quantity: 1 // or order.quantity if you have it
      }];

      const fulfillData = {
        name: order.name,
        address: order.address,
        pincode: order.pincode,
        state: order.state,
        email: order.email,
        totalAmount: order.totalAmount,
        products: products // Use the prepared products array
      };

      // Share order data with the Fulfill collection in MongoDB
      await axios.post('/api/fulfill', fulfillData);

      // After successful post, delete the order
      await handleDeleteOrder(order._id);

      // Navigate to fulfilled orders page
      navigate('/fulfilled-orders');
    } catch (err) {
      console.error('Error fulfilling order:', err);
      setError(err);
    }
  };

  const totalBalance = orders.reduce((total, order) => total + order.totalAmount, 0);
  const totalOrderCount = orders.length;

  if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-center text-red-600">Error fetching orders: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-blue-600">Order Management</h1>
      <div className="mb-4 text-md md:text-lg font-semibold text-gray-700 text-center md:text-left">
        <p>Total Orders: {totalOrderCount}</p>
        <p>Total Balance: ₹{totalBalance.toFixed(2)}</p>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs md:text-sm uppercase leading-normal">
              <th className="py-2 px-4 md:py-4 md:px-6 text-left">Pincode</th>
              <th className="py-2 px-4 md:py-4 md:px-6 text-left">User Name</th>
              <th className="py-2 px-4 md:py-4 md:px-6 text-left">Address</th>
              <th className="py-2 px-4 md:py-4 md:px-6 text-left">Total Amount</th>
              <th className="py-2 px-4 md:py-4 md:px-6 text-left">Products</th>
              <th className="py-2 px-4 md:py-4 md:px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm md:text-sm font-light">
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="py-2 px-2 md:py-4 md:px-6">{order.pincode}</td>
                <td className="py-2 px-2 md:py-4 md:px-6">{order.name}</td>
                <td className="py-2 px-2 md:py-4 md:px-6">{order.address}</td>
                <td className="py-2 px-2 md:py-4 md:px-6 text-green-500 font-semibold">₹{order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-2 md:py-4 md:px-6">
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4 bg-gray-50 p-2 md:p-4 rounded-md shadow">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-12 h-12 md:w-16 md:h-16 rounded object-cover shadow-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100';
                        }}
                      />
                      <div className="mt-2 md:mt-0">
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800">{order.productName}</h3>
                        <p className="text-gray-600 text-xs md:text-sm">Price: ₹{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 md:py-4 md:px-6 text-center">
                  <button
                    onClick={() => handleFulfillOrder(order)}
                    className="bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full mr-1 md:mr-2 hover:bg-green-600 transition duration-300 text-xs md:text-base"
                  >
                    Fulfill
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white m-4 px-2 py-1 md:px-4 md:py-2 rounded-full hover:bg-red-600 transition duration-300 text-xs md:text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;