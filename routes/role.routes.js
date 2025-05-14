import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleValidation from "../validations/role.validation.js";
import roleController from "../controllers/role.controller.js";
import validateRequest from "../middlewares/validateRequest.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', roleController.index);
router.get('/:id', roleController.get);
router.post('/', roleValidation.createRole, validateRequest, roleController.create);
router.put('/:id', roleValidation.createRole, validateRequest, roleController.update);
router.delete('/:id', roleController.destroy);

export default router