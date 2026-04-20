import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrderById(orderId);
      setOrder(response.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [orderId, fetchOrder]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-success-container">
      <div className="success-box">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order</p>

        {order && (
          <div className="order-info">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDeliveryTime).toLocaleString()}</p>
          </div>
        )}

        <div className="success-actions">
          <button onClick={() => navigate('/foods')} className="btn-continue">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-dashboard">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
