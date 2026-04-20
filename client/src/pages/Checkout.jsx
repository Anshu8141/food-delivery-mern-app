import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: user?.phone || '',
    houseNo: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'cash_on_delivery',
    deliveryInstructions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Full Name validation
    // ✅ Full Name validation (only letters & space allowed)
if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
  toast.error('Full name should contain only letters');
  return;
}


    // ✅ Phone validation (exact 10 digits)
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      toast.error('Enter valid 10 digit mobile number');
      return;
    }

    if (!formData.houseNo.trim()) {
      toast.error('Please enter house/flat number');
      return;
    }

    if (!formData.streetArea.trim()) {
      toast.error('Please enter street/area');
      return;
    }
// ✅ City validation (only letters allowed)
if (!/^[A-Za-z\s]+$/.test(formData.city.trim())) {
  toast.error('City should contain only letters');
  return;
}

    // ✅ State validation (only letters allowed)
if (!/^[A-Za-z\s]+$/.test(formData.state.trim())) {
  toast.error('State should contain only letters');
  return;
}

    // ✅ Pincode validation (6 digits)
    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      toast.error('Enter valid 6 digit pincode');
      return;
    }

    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      const items = cart.map((item) => ({
        foodId: item._id,
        quantity: item.quantity,
      }));

      const fullAddress = `${formData.houseNo}, ${formData.streetArea}${
        formData.landmark ? ', ' + formData.landmark : ''
      }, ${formData.city}, ${formData.state} ${formData.pincode}, ${formData.country}`;

      const response = await orderService.createOrder({
        items,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        deliveryAddress: fullAddress,
        paymentMethod: formData.paymentMethod,
        notes: formData.deliveryInstructions,
      });

      toast.success('Order placed successfully! 🎉');
      clearCart();
      navigate(`/order-success/${response.order._id}`);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Failed to create order. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/foods')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>🛒 Checkout</h1>

      <div className="checkout-grid">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <h3>📍 Delivery Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>House / Flat No. *</label>
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="e.g., Flat 101"
                />
              </div>

              <div className="form-group">
                <label>Street / Area *</label>
                <input
                  type="text"
                  name="streetArea"
                  value={formData.streetArea}
                  onChange={handleChange}
                  placeholder="Main Road"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <h3>💳 Payment Method</h3>

            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  checked={formData.paymentMethod === 'cash_on_delivery'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>

            <h3>📝 Delivery Instructions</h3>

            <div className="form-group">
              <textarea
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-place-order"
            >
              {loading ? '⏳ Processing...' : '✅ Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} className="order-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="total-row">
              <span>Delivery:</span>
              <span>₹50.00</span>
            </div>

            <div className="total-row final">
              <span>Total:</span>
              <span>₹{(totalPrice + 50).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
