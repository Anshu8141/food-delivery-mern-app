import api from './api';

export const foodService = {
  getAllFoods: async (params = {}) => {
    const response = await api.get('/foods', { params });
    return response.data;
  },

  getFoodById: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },

  getFoodByCategory: async (categoryId) => {
    const response = await api.get(`/foods/category/${categoryId}`);
    return response.data;
  },

  createFood: async (foodData) => {
    const response = await api.post('/foods', foodData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateFood: async (id, foodData) => {
    const response = await api.put(`/foods/${id}`, foodData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteFood: async (id) => {
    const response = await api.delete(`/foods/${id}`);
    return response.data;
  },
};

export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
