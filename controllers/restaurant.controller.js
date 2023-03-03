const Restaurant = require('../models/restaurant.model');
const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The restaurant was created successfully',
    restaurant,
  });
});

exports.findRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurants were found successfully',
    restaurants,
  });
});

//TODO: Middelwares

exports.findRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'The restaurant was not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The restaurant was found successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, address } = req.body;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'The restaurant was not found',
    });
  }

  const updatedRestaurant = await restaurant.update({
    name,
    address,
  });

  res.json({
    status: 'success',
    message: 'The restaurant has been updated successfully',
    updatedRestaurant,
  });
});

exports.disableRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'The restaurant was not fount',
    });
  }

  await restaurant.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been delated',
  });
});

exports.createReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const review = await Review.create({
    userId: sessionUser.id,
    restaurantId: restaurant.id,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The review was created successfully',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The review has been deleted',
  });
});
