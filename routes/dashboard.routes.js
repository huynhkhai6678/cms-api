import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import dashboardController from "../controllers/dashboard.controller.js";

var router = express.Router();

router.use(authMiddleware);

router.get('/', dashboardController.index);
router.get('/admin-revenue', dashboardController.adminRevenue);

export default router