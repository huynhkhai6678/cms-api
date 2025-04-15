import { validationResult } from "express-validator";

/**
 * Middleware to check for validation errors.
 * Mimics Laravel's request->validate()
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.mapped()
    });
  }

  next();
};

export default validateRequest;