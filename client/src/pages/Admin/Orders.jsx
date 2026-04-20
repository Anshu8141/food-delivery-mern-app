import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Loading';
import '../../styles/AdminDashboard.css';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAllOrders();
      setOrders(res.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      fetchOrders();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-dashboard">

      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (

        <table className="foods-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((o) => (

              <tr key={o._id}>

                <td>{o._id.slice(0,8).toUpperCase()}</td>

                <td>{o.user?.name || "N/A"}</td>

                <td>₹{o.totalAmount.toFixed(2)}</td>

                {/* STATUS BADGE */}

                <td>
                  <span className={`status ${o.status}`}>
                    {o.status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}

                <td>

                  {o.status !== "delivered" && (

                    <button
                      className="btn-deliver"
                      onClick={() => handleStatusChange(o._id,"delivered")}
                    >
                      Deliver
                    </button>

                  )}

                  {o.status !== "cancelled" && (

                    <button
                      className="btn-cancel"
                      onClick={() => handleStatusChange(o._id,"cancelled")}
                    >
                      Cancel
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );

};

export default Orders;