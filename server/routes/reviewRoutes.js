const express = require("express");
const router = express.Router();

let reviews = [];

router.post("/", (req, res) => {

  const { foodId, rating, comment } = req.body;

  const review = {
    _id: Date.now(),
    foodId,
    rating,
    comment
  };

  reviews.push(review);

  res.json(review);

});

router.get("/:foodId", (req, res) => {

  const foodReviews = reviews.filter(
    r => r.foodId === req.params.foodId
  );

  res.json(foodReviews);

});

module.exports = router;