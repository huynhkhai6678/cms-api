import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import multer from "multer";

const form = multer();

router.post('/register', authController.register);
router.post('/login', form.none(), authController.login);

export default router