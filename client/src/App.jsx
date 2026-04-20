import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FoodListing from './pages/FoodListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Dashboard from './pages/Dashboard';

// Admin
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOrders from './pages/Admin/Orders';
import AdminFoods from './pages/Admin/Foods';
import AdminCategories from './pages/Admin/Categories';

import './App.css';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppRoutes user={user} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

function AppRoutes({ user }) {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar on Admin pages */}
      {!location.pathname.startsWith('/admin') && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/foods" element={<FoodListing />} />
          <Route path="/food/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          {/* User Protected Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute user={user}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success/:orderId"
            element={
              <ProtectedRoute user={user}>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes with Nested Structure */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="foods" element={<AdminFoods />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<div className="not-found"><h1>Page Not Found</h1></div>} />
        </Routes>
      </main>

      {/* Hide Footer on Admin */}
      {!location.pathname.startsWith('/admin') &&
        location.pathname === '/' && <Footer />}
    </>
  );
}

export default App;
