import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RestaurantDetails from './pages/Admin/RestaurantDetails';
import UserDetails from './pages/Admin/UserDetails';

const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/restaurants" element={<RestaurantDetails />} />
      <Route path="/users" element={<UserDetails />} />
    </Routes>
  );
};

export default AdminLayout;