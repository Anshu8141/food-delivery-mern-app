import React, { useState, useEffect } from 'react';
import { foodService, categoryService } from '../../services/foodService';
import Loading from '../../components/Loading';
import '../../styles/AdminDashboard.css';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFoodForm, setShowFoodForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    availability: true,
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const foodsRes = await foodService.getAllFoods();
      const categoriesRes = await categoryService.getCategories();

      // 🔥 FIXED HERE
      setFoods(Array.isArray(foodsRes) ? foodsRes : []);
      setCategories(
        categoriesRes.categories
          ? categoriesRes.categories
          : Array.isArray(categoriesRes)
          ? categoriesRes
          : []
      );

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      await foodService.deleteFood(id);
      fetchData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category?._id || '',
      availability: food.availability,
      image: null,
    });
    setShowFoodForm(true);
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('availability', formData.availability);

      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingFood) {
        await foodService.updateFood(editingFood._id, data);
        setEditingFood(null);
      } else {
        await foodService.createFood(data);
      }

      setShowFoodForm(false);
      fetchData();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>

      <button
        className="btn-add"
        onClick={() => {
          setEditingFood(null);
          setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            availability: true,
            image: null,
          });
          setShowFoodForm(true);
        }}
      >
        + Add Food
      </button>

      {showFoodForm && (
        <div className="food-form">
          <h3>{editingFood ? 'Edit Food' : 'New Food'}</h3>
          <form onSubmit={handleFoodSubmit}>
            <label>Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            <label>Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />

            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                checked={formData.availability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.checked,
                  })
                }
              />
              Available
            </label>

            <label>Image</label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              required={!editingFood}
            />

            <button type="submit">
              {editingFood ? 'Update' : 'Create'}
            </button>

            <button
              type="button"
              onClick={() => setShowFoodForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {foods.length === 0 ? (
        <p>No foods added yet.</p>
      ) : (
        <table className="foods-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category?.name}</td>
                <td>₹{food.price}</td>
                <td>
                  {food.availability ? '✅ Available' : '❌ Out of Stock'}
                </td>
                <td>
                  <button onClick={() => handleEditFood(food)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFood(food._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Foods;