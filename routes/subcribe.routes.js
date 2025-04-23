import express from "express";
import SubcribeController from "../controllers/subcribe.controller.js";

var router = express.Router();

router.post('/', SubcribeController.createSubcriber);

export default router