import express from "express";
import clinicController from "../controllers/clinic.controller.js";
import clinicValidation from "../validations/clinic.validation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', clinicController.getClinicList);
router.get('/:id', clinicController.getClinicById);
router.post('/', clinicValidation.createClinic, clinicController.createClinic);
router.put('/:id', clinicValidation.createClinic, clinicController.updateClinic);
router.delete('/:id', clinicController.deleteClinic);

export default router