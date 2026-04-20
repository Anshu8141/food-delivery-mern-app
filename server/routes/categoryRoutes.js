const express = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController.js');
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

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authenticate, authorize(['admin']), upload.single('image'), createCategory);
router.put('/:id', authenticate, authorize(['admin']), upload.single('image'), updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), deleteCategory);

module.exports = router;
