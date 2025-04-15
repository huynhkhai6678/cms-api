import { body } from "express-validator";

let createClinic = [
    body('name').notEmpty().withMessage('Name is required'),
    body('landing_name').notEmpty().withMessage('Landing name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('region_code').notEmpty().withMessage('Region code is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('type').notEmpty().withMessage('Type is required'),
    body('country_id').notEmpty().withMessage('Country is required'),
];

export default {
    createClinic
}