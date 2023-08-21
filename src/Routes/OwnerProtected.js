import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OwnerProtected = ({ children }) => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const isStaff = user ? user.staff.toString() : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isStaff === 'True') {
      return; // Allow rendering children when isStaff is 'True'
    } else {
      // Show a toast message or redirect to the login page
      navigate('/');
    //   toast.error('You are not a Restaurant Owner.');
    }
  }, [isStaff, navigate]);

  if (!user) {
    return null; // Render nothing if user data is not available yet
  }

  if (isStaff === 'True') {
    return children;
  }

  return null; // Render nothing when isStaff is not 'True'
};

export default OwnerProtected;