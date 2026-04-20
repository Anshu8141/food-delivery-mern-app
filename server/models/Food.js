const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide food name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide food description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide food price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide food image'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
      default: 30,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);
