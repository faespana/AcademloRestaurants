const { validationResult, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.signupValidations = [
  check('name', 'The name is requiered').not().isEmpty(),
  check('email', 'The email is requiered').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password is requiered').not().isEmpty(),
];

exports.loginValidations = [
  check('email', 'The email is requiered').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password is requiered').not().isEmpty(),
];

exports.createReviewValidation = [
  check('comment', 'the comment is required').not().isEmpty(),
  check('rating', 'the rating is required').not().isEmpty(),
  check('rating', 'the rating must be numeric').isNumeric(),
];

exports.createMealValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('price', 'the price is required').not().isEmpty(),
  check('price', 'the price must be numeric').isNumeric(),
];

exports.createOrderValidation = [
  check('mealId', 'the mealId is required').not().isEmpty(),
  check('mealId', 'the mealId must be numeric').isNumeric(),
  check('quantity', 'the quantity is required').not().isEmpty(),
  check('quantity', 'the quantity must be numeric').isNumeric(),
];
