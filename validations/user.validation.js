import { body } from "express-validator";

const createUser = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirm_password').notEmpty().withMessage('Confirm password is required'),
    body('clinic_ids').notEmpty().withMessage('Clinics is required'),
];

const editUser = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('clinic_ids').notEmpty().withMessage('Clinics is required'),
];

export default {
    createUser,
    editUser
}