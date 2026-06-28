import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentQRIS from './pages/PaymentQRIS';
import PaymentCash from './pages/PaymentCash';
import Success from './pages/Success';
import ProductDetail from './pages/ProductDetail';
import OrderStatusCustomer from './pages/OrderStatusCustomer';
import Dashboard from './pages/admin/Dashboard';
import ManagementMenu from './pages/admin/ManagementMenu';
import AddEditMenu from './pages/admin/AddEditMenu';
import Orders from './pages/admin/Orders';
import OrderStatus from './pages/admin/OrderStatus';
import RatingReview from './pages/admin/RatingReview';
import OrderDetail from './pages/admin/OrderDetail';
import AdminLogin from './pages/admin/AdminLogin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment/qris" element={<PaymentQRIS />} />
      <Route path="/payment/cash" element={<PaymentCash />} />
      <Route path="/status" element={<OrderStatusCustomer />} />
      <Route path="/success" element={<Success />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/menu" element={<ManagementMenu />} />
      <Route path="/admin/menu/add" element={<AddEditMenu />} />
      <Route path="/admin/menu/edit/:id" element={<AddEditMenu />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/order/:id" element={<OrderDetail />} />
      <Route path="/admin/status" element={<OrderStatus />} />
      <Route path="/admin/reviews" element={<RatingReview />} />
    </Routes>
  );
};

export default App;
