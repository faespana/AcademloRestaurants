const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not fount',
    });
  }

  const updatedUser = await user.update({
    name,
    email,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was updated successfully',
    updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not fount',
    });
  }

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The user has been delated',
  });
});

exports.findOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: 'completed',
    },
    include: [
      {
        model: Meal,
        attributes: {
          exclude: [
            'id',
            'price',
            'status',
            'createdAt',
            'updatedAt',
            'restaurantId',
          ],
        },
        where: {
          status: true,
        },
        include: [
          {
            model: Restaurant,
            attributes: {
              exclude: [
                'id',
                'address',
                'rating',
                'status',
                'createdAt',
                'updatedAt',
              ],
            },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'My orders were found successfully',
    orders,
  });
});

exports.findOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'The order was not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The order was found successfully',
    order,
  });
});
