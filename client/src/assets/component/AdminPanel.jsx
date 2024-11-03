import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete a product
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        setProducts(products.filter((product) => product._id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Error deleting product: ' + err.message); // Notify the user
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading products...</div>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Admin Panel</h1>
      <Link
        to="/add"
        className="mb-6 inline-block text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
      >
        + Add New Product
      </Link>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  ₹{product.price.toFixed(2)} {/* Change this line for INR */}
                </td>
                {/* Alternatively, you can use Rs as below */}
                {/* <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  Rs {product.price.toFixed(2)} {/* Change this line for Rs */}
                {/* </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition duration-200"
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

export default AdminPanel;
