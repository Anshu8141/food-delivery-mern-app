import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import '../styles/FoodCard.css';

const FoodCard = ({ food }) => {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    toast.success(`${food.name} added to cart! 🛒`);
  };

  const handleViewDetails = () => {
    // ✅ Correct route (matches App.jsx)
    navigate(`/food/${food._id}`);
  };

  return (
    <div className="food-card">

      <div className="food-image">
        <img
          src={food.image || "/default-food.jpg"}
          alt={food.name}
          onError={(e) => e.target.src = "/default-food.jpg"}
        />

        {!food.availability && (
          <span className="unavailable-badge">
            Out of Stock
          </span>
        )}
      </div>

      <div className="food-info">

        <h3 className="food-name">{food.name}</h3>

        <p className="food-description">
          {food.description?.substring(0, 60)}...
        </p>

        <div className="food-meta">

          <span className="rating">
            ⭐ {food.rating || 4.5}
          </span>

          <span className="prep-time">
            ⏱ {food.preparationTime || 30} min
          </span>

        </div>

        <div className="food-footer">

          <span className="food-price">
            ₹{food.price}
          </span>

          <div className="food-actions">

            <button
              onClick={handleViewDetails}
              className="btn-view"
            >
              View
            </button>

            <button
              onClick={handleAddToCart}
              className="btn-add"
              disabled={!food.availability}
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FoodCard;