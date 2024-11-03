// client/src/assets/component/FulfilledOrders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FulfilledOrders = () => {
  const [fulfilledOrders, setFulfilledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFulfilledOrders();
  }, []);

  const fetchFulfilledOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/fulfill');
      setFulfilledOrders(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching fulfilled orders:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:4000/api/fulfill/${orderId}`);
        fetchFulfilledOrders(); // Refresh the list
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fulfilled Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Order Details</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fulfilledOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Pincode:</strong> {order.pincode}</p>
                    <p><strong>State:</strong> {order.state}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {product.productImage && (
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/100';
                            }}
                          />
                        )}
                        <span>{product.productName}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">₹{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </ tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FulfilledOrders;