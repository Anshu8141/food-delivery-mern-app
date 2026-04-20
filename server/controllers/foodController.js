const Food = require('../models/Food.js');

// CREATE FOOD
exports.createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      preparationTime,
      ingredients,
      availability,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: 'Name, description, price and category are required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Food image is required',
      });
    }

    const food = new Food({
      name,
      description,
      price,
      category,
      image: req.file.path,
      preparationTime: preparationTime || 30,
      ingredients: ingredients ? ingredients.split(',') : [],
      availability: availability !== undefined ? availability : true,
      createdBy: req.userId,
    });

    await food.save();
    await food.populate('category');

    res.status(201).json({
      success: true,
      message: 'Food item created successfully',
      food,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL FOODS (SEARCH + CATEGORY + SORT FIXED)
exports.getAllFoods = async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;

    let query = {};

    // 🔍 Search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 📂 Category filter
    if (category) {
      query.category = category;
    }

    // 🔄 Sorting
    let sortOption = { createdAt: -1 };

    if (sortBy === "price") {
      sortOption = { price: 1 };
    }

    if (sortBy === "rating") {
      sortOption = { rating: -1 };
    }

    const foods = await Food.find(query)
      .populate("category")
      .sort(sortOption);

    res.json(foods);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FOOD BY ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category');

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FOOD BY CATEGORY
exports.getFoodByCategory = async (req, res) => {
  try {
    const foods = await Food.find({
      category: req.params.categoryId,
    }).populate('category');

    res.json(foods);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE FOOD
exports.updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('category');

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({
      message: 'Food updated successfully',
      food: updatedFood,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE FOOD
exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({ message: 'Food deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};