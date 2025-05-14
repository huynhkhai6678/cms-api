import { body } from "express-validator";

let createChainClinic = [
    body('name').notEmpty().withMessage('Name is required'),
    body('clinic_ids').notEmpty().withMessage('Clinic ids is required'),
];

export default {
    createChainClinic
}