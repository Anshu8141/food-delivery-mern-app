import React, { useState, useEffect } from 'react';
import { foodService, categoryService } from '../services/foodService';
import Loading from '../components/Loading';
import '../styles/Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🍔 Welcome to FoodHub</h1>
          <p>Order delicious food and get it delivered to your doorstep</p>
          <a href="/foods" className="btn-explore">Explore Foods</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose FoodHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🚚 Fast Delivery</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices</h3>
            <p>Competitive and affordable prices</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Quality Food</h3>
            <p>Fresh and delicious meals</p>
          </div>
          <div className="feature-card">
            <h3>📱 Easy to Use</h3>
            <p>Simple and user-friendly platform</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
