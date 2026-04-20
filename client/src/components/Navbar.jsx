import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">🍔 FoodHub</Link>
        </div>

        {/* Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/foods">Foods</Link>

          {/* Admin Only */}
          {user?.role === "admin" && (
            <Link to="/admin">Admin Panel</Link>
          )}

          {/* User Dashboard */}
          {user && <Link to="/dashboard">Dashboard</Link>}

          {/* Auth Section */}
          {!user ? (
            <>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/signup" className="btn-signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="cart-btn">
                🛒 Cart
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;