// server/middlewares/validationMiddleware.js
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return all error messages from validation.
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequest;
