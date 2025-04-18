import express from "express";
import clinicController from "../controllers/ClinicController.js";
import validateRequest from "../middlewares/validateRequest.js";
import clinicValidation from "../validations/clinicValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', clinicController.getClinicList);
router.get('/:id', clinicValidation.createClinic, validateRequest, clinicController.getClinicById);
router.post('/', clinicValidation.createClinic, validateRequest, clinicController.createClinic);
router.delete('/:id', clinicController.deleteClinic);

export default router