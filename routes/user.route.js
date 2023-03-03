const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateUserById,
  deleteUser,
  findOrders,
  findOrderById,
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.use(protect);

router.patch('/:id', validateFields, updateUserById);

router.delete('/:id', validateFields, deleteUser);

router.get('/orders', validateFields, findOrders);

router.get('/orders/:id', validateFields, findOrderById);

module.exports = {
  userRouter: router,
};
