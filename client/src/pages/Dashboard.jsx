import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import Loading from '../components/Loading';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}! 👋</h1>
        <p>Email: {user?.email}</p>
      </div>

      <div className="dashboard-content">
        <h2>Your Orders</h2>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order._id.substring(0, 8).toUpperCase()}</h3>
                  <span className={`status ${order.status}`}>{order.status.toUpperCase()}</span>
                </div>

                <div className="order-details">
                  <p><strong>Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                  <p><strong>Items:</strong> {order.items.length} items</p>
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="order-items-mini">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <span key={idx}>{item.food?.name} x {item.quantity}</span>
                  ))}
                  {order.items.length > 2 && <span>+{order.items.length - 2} more</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
