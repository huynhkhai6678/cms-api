import express from "express";
import EnquiryController from "../controllers/EnquiryController.js";

var router = express.Router();

router.post('/', EnquiryController.createEnquiry);

export default router