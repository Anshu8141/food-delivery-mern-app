import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/foodService';
import Loading from '../../components/Loading';
import '../../styles/AdminDashboard.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getCategories();
      setCategories(res.categories || []);
    } catch (error) {
      console.error('Loading categories failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await categoryService.updateCategory(editing._id, { name: formData.name });
        setEditing(null);
      } else {
        await categoryService.createCategory({ name: formData.name });
      }
      setShowForm(false);
      setFormData({ name: '' });
      fetchCategories();
    } catch (error) {
      console.error('Category save failed:', error);
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-dashboard">
      <h1>Categories</h1>
      <button
        className="btn-add"
        onClick={() => {
          setEditing(null);
          setFormData({ name: '' });
          setShowForm(true);
        }}
      >
        + Add Category
      </button>

      {showForm && (
        <div className="food-form">
          <h3>{editing ? 'Edit Category' : 'New Category'}</h3>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
            <button type="submit">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <p>No categories added yet.</p>
      ) : (
        <table className="foods-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
