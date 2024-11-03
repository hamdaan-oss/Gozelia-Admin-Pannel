// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './assets/component/AdminPanel';
import AddProduct from './assets/component/AddProduct';
import EditProduct from './assets/component/EditProduct';
import Coupon from './assets/component/ManageCoupons';
import UserManagement from './assets/component/UserManagement';
import OrderManagement from './assets/component/OrderManagement';
import Navbar from './assets/component/Navbar'; 
import FulfilledOrders from './assets/component/FulfilledOrders';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Include Navbar here so it shows on all pages */}
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/fulfilled-orders" element={<FulfilledOrders />} />
        <Route path="/orders" element={<OrderManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
