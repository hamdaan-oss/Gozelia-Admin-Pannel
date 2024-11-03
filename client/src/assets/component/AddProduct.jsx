import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price, category, description, image };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        navigate('/'); // Redirect to admin panel after successful add
      } else {
        throw new Error('Failed to add product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Product name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Product price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Product category"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
              placeholder="Product description"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Image URL"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
