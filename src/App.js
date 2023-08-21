// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact';
import UserProfilepage from './pages/UserProfilepage';
import Restaurant from './pages/Restaurant';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RestaurantDetails from './pages/Admin/RestaurantDetails';
import UserDetails from './pages/Admin/UserDetails';
import OwnerPage from './pages/Owners/OwnerPage';
import Search from './pages/Search';
import Register from './pages/Owners/Register';
import AdminProtected from './Routes/AdminProtected';
import OwnerProtected from './Routes/OwnerProtected';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserProfilepage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />

          {/* Protected admin routes */}
          <Route path='/admin' element={<AdminProtected><AdminDashboard /></AdminProtected>}/>
          <Route path="/admin/restaurants" element={<AdminProtected><RestaurantDetails /></AdminProtected>} />
          <Route path="/admin/users" element={<AdminProtected><UserDetails /></AdminProtected>} />

          <Route path="/owner" element={<OwnerProtected> <OwnerPage /></OwnerProtected>} />
          <Route path="/owner/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
