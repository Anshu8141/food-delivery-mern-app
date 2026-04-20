import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(null);

  const handleRemove = (foodId) => {
    removeFromCart(foodId);
    setShowConfirm(null);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>🛒 Your Cart is Empty</h2>
        <p>Add some delicious food items to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img 
              src={item.image || '/default-food.jpg'} 
              alt={item.name}
              className="cart-item-image"
            />
            
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p className="item-price">₹{item.price} per item</p>
              <p className="item-total">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>

            <button 
              className="btn-remove"
              onClick={() => setShowConfirm(item._id)}
            >
              Remove
            </button>

            {showConfirm === item._id && (
              <div className="confirm-dialog">
                <p>Remove this item?</p>
                <button onClick={() => handleRemove(item._id)} className="btn-confirm">Yes</button>
                <button onClick={() => setShowConfirm(null)} className="btn-cancel">No</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery:</span>
          <span>₹50.00</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>₹{(totalPrice + 50).toFixed(2)}</span>
        </div>
        <button 
          className="btn-checkout" 
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
