import express from "express";
import FrontController from "../controllers/front.controller.js";
import TestimonialController from "../controllers/testimonial.controller.js";

var router = express.Router();

router.get('/', FrontController.getSettingByClinic);
router.get('/testimonials/:clinicId', TestimonialController.getFrontTestimonial);
router.get('/service-counters/:clinicId', FrontController.getServiceCounter);
router.get('/doctors/:clinicId', FrontController.getDoctors);
router.get('/top-doctors/:clinicId', FrontController.getTopDoctors);
router.get('/landing/:clinicId', FrontController.getLanding);
router.get('/faqs/:clinicId', FrontController.getFaqs);
router.get('/services/:clinicId', FrontController.getServices);


export default router