import React, { useState, useEffect } from "react";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountAmount: "",
    applicableProducts: [],
    expiryDate: "",
    selectedCategory: "",
    applyToAllProducts: false,
  });

  useEffect(() => {
    setLoading(true);
    fetchCoupons();
    fetchCategoriesAndProducts();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/coupons");
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
    setLoading(false);
  };

  const fetchCategoriesAndProducts = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch("http://localhost:4000/api/products/categories/unique"),
        fetch("http://localhost:4000/api/products"),
      ]);
      const categoriesData = await categoriesResponse.json();
      const productsData = await productsResponse.json();
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching categories or products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discountAmount) {
      console.error("Coupon code and discount amount are required.");
      return;
    }

    const applicableProducts = formData.applyToAllProducts
      ? []
      : formData.applicableProducts;

    try {
      const response = await fetch("http://localhost:4000/api/coupons/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicableProducts,
        }),
      });

      if (response.ok) {
        fetchCoupons();
        setFormData({
          code: "",
          discountAmount: "",
          applicableProducts: [],
          expiryDate: "",
          selectedCategory: "",
          applyToAllProducts: false,
        });
        setFilteredProducts([]);
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );
    if (confirmed) {
      try {
        await fetch(`http://localhost:4000/api/coupons/${id}`, {
          method: "DELETE",
        });
        fetchCoupons();
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, selectedCategory });

    const filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    setFilteredProducts(filtered);
    setFormData((prevData) => ({
      ...prevData,
      applicableProducts: [],
      applyToAllProducts: false,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Coupons</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <input
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="discountAmount"
          placeholder="Discount"
          type="number"
          value={formData.discountAmount}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="selectedCategory"
          value={formData.selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center space-x-2">
          <input
            name="applyToAllProducts"
            type="checkbox"
            checked={formData.applyToAllProducts}
            onChange={handleInputChange}
          />
          <label>Apply to All Products</label>
        </div>

        {!formData.applyToAllProducts && (
          <select
            multiple
            name="applicableProducts"
            value={formData.applicableProducts}
            onChange={(e) =>
              setFormData({
                ...formData,
                applicableProducts: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            className="w-full p-2 border rounded"
          >
            {(filteredProducts.length > 0 ? filteredProducts : products).map(
              (product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              )
            )}
          </select>
        )}

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
          Add Coupon
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Existing Coupons</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Code</th>
                <th className="py-3 px-6 text-left">Discount</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-left">Expiry Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{coupon.code}</td>
                  <td className="py-3 px-6 text-left">{coupon.discountAmount}</td>
                  <td className="py-3 px-6 text-left">
                    {coupon.applicableProducts.length
                      ? coupon.applicableProducts.map((p) => p.productName).join(", ")
                      : "All Products"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
