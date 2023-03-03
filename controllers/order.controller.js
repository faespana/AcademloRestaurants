const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser, meal } = req;

  const order = await Order.create({
    userId: sessionUser.id,
    mealId,
    quantity,
    totalPrice: quantity * meal.price,
  });

  res.status(201).json({
    status: 'success',
    message: 'The review was created successfully',
    order,
  });
});

exports.findMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'My orders were found successfully',
    orders,
  });
});

exports.updateStatusOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'The order was not fount',
    });
  }

  const updatedOrder = await order.update({ status: 'completed' });

  res.status(201).json({
    status: 'success',
    message: 'The order was updated successfully',
    updatedOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'The order was not fount',
    });
  }

  const updatedOrder = await order.update({ status: 'canceled' });

  res.status(201).json({
    status: 'success',
    message: 'The order was cancelled successfully',
    updatedOrder,
  });
});
