import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { foodService } from "../services/foodService";
import { reviewService } from "../services/reviewService";
import { CartContext } from "../context/CartContext";
import Loading from "../components/Loading";
import "../styles/ProductDetails.css";

const ProductDetails = () => {

  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const fetchFood = useCallback(async () => {
    try {
      setLoading(true);
      const response = await foodService.getFoodById(id);
      setFood(response);
    } catch (error) {
      console.error("Error fetching food:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await reviewService.getReviews(id);
      setReviews(res);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchFood();
    fetchReviews();
  }, [fetchFood, fetchReviews]);

  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }

    toast.success(`${food.name} added to cart! 🛒`);
  };

  const handleReviewSubmit = async () => {

    try {

      await reviewService.addReview({
        foodId: id,
        rating,
        comment
      });

      toast.success("Review submitted!");

      setComment("");

      fetchReviews();

    } catch (error) {

      console.log(error);

    }

  };

  if (loading) return <Loading />;

  if (!food) {
    return (
      <div className="product-not-found">
        <h2>Food item not found</h2>
      </div>
    );
  }

  return (

    <div className="product-details">

      <div className="product-image">

        <img
          src={
            food.image
              ? `http://localhost:5000/${food.image}`
              : "/default-food.jpg"
          }
          alt={food.name}
        />

      </div>

      <div className="product-info">

        <h1>{food.name}</h1>

        <div className="product-rating">
          ⭐ {food.rating || 4.5} / 5
        </div>

        <p>{food.description}</p>

        <div className="product-meta">
          <span>⏱ {food.preparationTime || 30} minutes</span>
          <span>📦 {food.category?.name}</span>
        </div>

        <div className="product-footer">

          <span className="price">₹{food.price}</span>

          <div className="quantity-control">

            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>

          </div>

          <button
            onClick={handleAddToCart}
            className="btn-add-to-cart"
          >
            Add to Cart
          </button>

        </div>

      </div>

      {/* ⭐ Reviews */}

      <div className="review-section">

        <h2>Customer Reviews</h2>

        <div className="review-form">

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <input
            type="text"
            placeholder="Write review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={handleReviewSubmit}>
            Submit
          </button>

        </div>

        {reviews.length === 0 && (
          <p>No reviews yet</p>
        )}

        {reviews.map((r) => (

          <div key={r._id} className="review-card">

            <strong>⭐ {r.rating}</strong>

            <p>{r.comment}</p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ProductDetails;