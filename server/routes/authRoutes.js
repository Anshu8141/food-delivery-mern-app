const express = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const { register, login, getProfile, updateProfile, getAllUsers, deleteUser } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/users', authenticate, authorize(['admin']), getAllUsers);
router.delete('/users/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
