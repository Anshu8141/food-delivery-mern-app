import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>

        <nav className="admin-nav">
          <NavLink 
            to="/admin/dashboard"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Dashboard
          </NavLink>

          <NavLink 
            to="/admin/orders"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Orders
          </NavLink>

          <NavLink 
            to="/admin/foods"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Foods
          </NavLink>

          <NavLink 
            to="/admin/categories"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Categories
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
