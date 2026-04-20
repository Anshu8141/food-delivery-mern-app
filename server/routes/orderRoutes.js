const express = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const { createOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders, cancelOrder, getOrderStats } = require('../controllers/orderController.js');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);
router.get('/:id', authenticate, getOrderById);
router.put('/:id/cancel', authenticate, cancelOrder);
router.get('/', authenticate, authorize(['admin']), getAllOrders);
router.put('/:id/status', authenticate, authorize(['admin']), updateOrderStatus);
router.get('/stats/dashboard', authenticate, authorize(['admin']), getOrderStats);

module.exports = router;
