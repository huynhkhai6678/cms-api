import { body } from "express-validator";

const createCurrency = [
    body('currency_name').notEmpty().withMessage('Name is required'),
    body('currency_icon').notEmpty().withMessage('Icon is required'),
    body('currency_code').notEmpty().withMessage('Code is required'),
    body('currency_code').isLength({ min:3, max: 3}).withMessage('Code should contain 3 character'),
];

export default {
    createCurrency,
}