const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The meal was created successfully',
    meal,
  });
});

exports.findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'The meals were found successfully',
    meals,
  });
});

exports.findMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'The meal was not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The meal was found successfully',
    meal,
  });
});

exports.updateMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, price } = req.body;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'The meal was not fount',
    });
  }

  const updatedMeal = await meal.update({
    name,
    price,
  });

  res.status(201).json({
    status: 'success',
    message: 'The meal was updated successfully',
    updatedMeal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'The meal was not fount',
    });
  }

  await meal.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been delated',
  });
});
