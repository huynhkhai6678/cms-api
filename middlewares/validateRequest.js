import { validationResult } from "express-validator";

/**
 * Middleware to check for validation errors.
 * Mimics Laravel's request->validate()
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateRequest;