const Review = require("../models/Review");

exports.createReview = async (req, res) => {

  try {

    const { foodId, rating, comment } = req.body;

    const review = new Review({
      food: foodId,
      rating,
      comment
    });

    await review.save();

    res.json({
      message: "Review added successfully",
      review
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      food: req.params.foodId
    });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};