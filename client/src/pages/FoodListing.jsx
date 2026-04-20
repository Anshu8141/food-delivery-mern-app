import React, { useState, useEffect, useCallback } from 'react';
import { foodService, categoryService } from '../services/foodService';
import FoodCard from '../components/FoodCard';
import Loading from '../components/Loading';
import '../styles/FoodListing.css';

const FoodListing = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  // 🔹 Debounce search (smooth typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params = {};

      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedCategory) params.category = selectedCategory;

      params.sortBy = sortBy;

      const foodsRes = await foodService.getAllFoods(params);
      const categoriesRes = await categoryService.getCategories();

      setFoods(Array.isArray(foodsRes) ? foodsRes : []);

      if (categoriesRes?.categories) {
        setCategories(categoriesRes.categories);
      } else if (Array.isArray(categoriesRes)) {
        setCategories(categoriesRes);
      } else {
        setCategories([]);
      }

    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedCategory, sortBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  return (
    <div className="food-listing">

      <div className="listing-header">
        <h1>🍕 Browse All Foods</h1>
        <p>Discover delicious meals from your favorite restaurants</p>
      </div>

      <div className="listing-controls">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}

        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Highest Rated</option>
        </select>

      </div>

      {foods.length === 0 ? (

        <div className="no-foods">
          <p>No foods found matching your criteria.</p>
        </div>

      ) : (

        <div className="foods-grid">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

      )}

    </div>
  );
};

export default FoodListing;