import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import userValidation from "../validations/user.validation.js";
import userController from "../controllers/user.controller.js";
import validateRequest from "../middlewares/validateRequest.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', userController.index);
router.get('/:id', userController.get);
router.post('/', userValidation.createUser, validateRequest, userController.create);
router.put('/:id', userValidation.editUser, validateRequest, userController.update);
router.delete('/:id', userController.destroy);

export default router