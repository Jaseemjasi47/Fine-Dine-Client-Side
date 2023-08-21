// AdminProtected.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProtected = ({ children }) => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const isAdmin = user ? user.admin.toString() : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === 'True') {
      return; // Allow rendering children when isAdmin is 'True'
    } else {
      // Show a toast message or redirect to the login page
      navigate('/');
      // toast.error('You do not have permission to access this page.');
    }
  }, [isAdmin, navigate]);

  if (!user) {
    return null; // Render nothing if user data is not available yet
  }

  if (isAdmin === 'True') {
    return children;
  }

  return null; // Render nothing when isAdmin is not 'True'
};

export default AdminProtected;
