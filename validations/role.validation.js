import { body } from "express-validator";

const createRole = [
    body('display_name').notEmpty().withMessage('Name is required'),
    body('permission_ids').isArray({ min: 1 }).withMessage('Permission is required')
];

export default {
    createRole,
}