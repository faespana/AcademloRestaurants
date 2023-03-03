const { Router } = require('express');
const { check } = require('express-validator');
const {
  createRestaurant,
  findRestaurants,
  findRestaurantById,
  updateRestaurant,
  disableRestaurant,
  createReviewsRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validExistRestaurant,
  validExistRestaurantId,
} = require('../middlewares/restaurant.middleware');
const { validExistReview } = require('../middlewares/review.middelware');
const {
  validateFields,
  createReviewValidation,
} = require('../middlewares/validateFields.middleware');
const AppError = require('../utils/appError');

const router = Router();

router.use(protect);

router.post(
  '/',
  [
    check('rating')
      .exists()
      .custom((value, { req }) => {
        if (value > 5 || value < 1) {
          throw new AppError('you must enter a rating from 1 to 5', 400);
        }
        return true;
      }),
  ],
  validateFields,
  createRestaurant
);

router.get('/', validateFields, findRestaurants);

router.get('/:id', validateFields, findRestaurantById);

router.patch('/:id', validateFields, updateRestaurant);

router.delete('/:id', validateFields, disableRestaurant);

router.post(
  '/reviews/:id',
  createReviewValidation,
  validateFields,
  validExistRestaurant,
  createReviewsRestaurant
);

router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validExistRestaurantId,
  validExistReview,
  protectAccountOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  validateFields,
  validExistRestaurantId,
  validExistReview,
  protectAccountOwner,
  deleteReview
);

module.exports = {
  restaurantRouter: router,
};
