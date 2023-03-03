const { Router } = require('express');
const {
  createMeal,
  findMeals,
  findMealById,
  updateMealById,
  deleteMeal,
} = require('../controllers/meal.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validExistRestaurant,
} = require('../middlewares/restaurant.middleware');
const {
  createMealValidation,
  validateFields,
} = require('../middlewares/validateFields.middleware');

const router = Router();

router.use(protect);

router.post(
  '/:id',
  createMealValidation,
  validateFields,
  validExistRestaurant,
  createMeal
);

router.get('/', validateFields, findMeals);

router.get('/:id', validateFields, findMealById);

router.patch('/:id', createMealValidation, validateFields, updateMealById);

router.delete('/:id', validateFields, deleteMeal);

module.exports = {
  mealRouter: router,
};
