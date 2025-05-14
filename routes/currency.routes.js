import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import currencyValidation from "../validations/currency.validation.js";
import currencyController from "../controllers/currency.controller.js";
import validateRequest from "../middlewares/validateRequest.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', currencyController.index);
router.get('/:id', currencyController.get);
router.post('/', currencyValidation.createCurrency, validateRequest, currencyController.create);
router.put('/:id', currencyValidation.createCurrency, validateRequest, currencyController.update);
router.delete('/:id', currencyController.destroy);

export default router