import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import clinicChainValidation from "../validations/clinic-chain.validation.js";
import clinicChainController from "../controllers/clinic-chain.controller.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', clinicChainController.index);
router.get('/:id', clinicChainController.get);
router.post('/', clinicChainValidation.createChainClinic, clinicChainController.create);
router.put('/:id', clinicChainValidation.createChainClinic, clinicChainController.update);
router.delete('/:id', clinicChainController.destroy);

export default router