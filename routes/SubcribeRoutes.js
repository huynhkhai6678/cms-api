import express from "express";
import SubcribeController from "../controllers/SubcribeController.js";

var router = express.Router();

router.post('/', SubcribeController.createSubcriber);

export default router