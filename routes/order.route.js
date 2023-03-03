const { Router } = require('express');
const { check } = require('express-validator');
const {
  createOrder,
  findMyOrders,
  updateStatusOrder,
  deleteOrder,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validExistMeal } = require('../middlewares/order.middleware');
const {
  validateFields,
  createOrderValidation,
} = require('../middlewares/validateFields.middleware');

const router = Router();

router.use(protect);

router.post(
  '/',
  createOrderValidation,
  validateFields,
  validExistMeal,
  createOrder
);

router.get('/me', validateFields, findMyOrders);

router.patch('/:id', validateFields, updateStatusOrder);

router.delete('/:id', validateFields, deleteOrder);

module.exports = {
  orderRouter: router,
};
