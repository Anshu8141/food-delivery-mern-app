const express = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodByCategory,
} = require('../controllers/foodController.js');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// ⚠ IMPORTANT ORDER
router.get('/', getAllFoods);
router.get('/category/:categoryId', getFoodByCategory);
router.get('/:id', getFoodById);

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('image'),
  createFood
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin']),
  upload.single('image'),
  updateFood
);

router.delete('/:id', authenticate, authorize(['admin']), deleteFood);

module.exports = router;
