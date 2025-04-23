import express from "express";
import ProfileController from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

var router = express.Router();
router.use(authMiddleware);

router.post('/update-language', ProfileController.updataLanguage);
router.post('/update-theme', ProfileController.updateTheme);
router.get('/', ProfileController.getProfile);
router.post('/', ProfileController.updateProfile);

export default router