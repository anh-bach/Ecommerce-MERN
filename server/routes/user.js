const express = require('express');

const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  getOrders,
} = require('../controllers/user');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

//cart
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);

//address
router.post('/user/address', authCheck, saveAddress);

//order
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, getOrders);

//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

module.exports = router;
