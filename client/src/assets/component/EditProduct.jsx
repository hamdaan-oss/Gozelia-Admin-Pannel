import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [product, setProduct] = useState(null); // State for storing product details
  const [name, setName] = useState(''); // State for product name
  const [description, setDescription] = useState(''); // State for product description
  const [price, setPrice] = useState(''); // State for product price
  const [category, setCategory] = useState(''); // State for product category
  const [image, setImage] = useState(''); // State for product image URL
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category);
        setImage(data.image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission to update the product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = { name, description, price: parseFloat(price), category, image };

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      navigate('/'); // Redirect to the admin products page after successful update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading product...</div>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Edit Product</h1>

      {/* Display Current Product Details */}
      <div className="mb-8 p-4 border border-gray-300 rounded bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Current Product Details</h2>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Image URL:</strong> {product.image}</p>
      </div>

      {/* Edit Product Form */}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-full transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
